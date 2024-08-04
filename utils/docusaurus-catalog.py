import argparse, html, json, os, re, shutil, xml.etree.ElementTree as ET

custom_edit_url = "https://github.com/tamus-cyber/standards.cyber.tamus.edu/tree/main/static/content/tamus.edu/TAMUS_profile.xml"

intro_text = """The security control standards catalog provides protective measures for systems, organizations, and
individuals. The controls are designed to facilitate risk management and compliance with applicable laws, policies,
regulations and standards. With few exceptions, the controls in the catalog are policy-, technology-, and
sector-neutral, meaning that the controls focus on the fundamental measures necessary to protect information and the
privacy of individuals across the information life cycle. While the controls are largely policy-, technology-, and
sector-neutral, that does not imply that the controls are policy-, technology-, and sector-unaware. Understanding
policies, technologies, and sectors is necessary so that the controls are relevant when they are implemented. Employing
a policy-, technology-, and sector-neutral control catalog has many benefits. It encourages organizations to: 

- Focus on the security and privacy functions and capabilities required for mission and business success and the
  protection of information and the privacy of individuals, irrespective of the technologies that are employed in
  organizational systems; 
- Analyze each security and privacy control for its applicability to specific technologies, environments of operation,
  mission and business functions, and communities of interest; and 
- Specify security and privacy policies as part of the tailoring process for controls that have variable parameters. 

In the few cases where specific technologies are referenced in controls, organizations are cautioned that the need to
manage security and privacy risks may go beyond the requirements in a single control associated with a technology. The
additional needed protection measures are obtained from the other controls in the catalog. Federal Information
Processing Standards and NIST Special Publications and Interagency/Internal Reports provide guidance on selecting
security and privacy controls that reduce risk for specific technologies and sector-specific applications, including
smart grid, cloud, healthcare, mobile, industrial control systems, and Internet of Things (IoT) devices. Controls in
the catalog are expected to change over time as controls are withdrawn, revised, and added. To maintain stability in
security and privacy plans, controls are not renumbered each time a control is withdrawn. Rather, notations of the
controls that have been withdrawn are maintained in the control catalog for historical purposes. Controls may be
withdrawn for a variety of reasons, including when the function or capability provided by the control has been
incorporated into another control, the control is redundant to an existing control, or the control is deemed to be no
longer necessary or effective. 

New controls are adopted on a regular basis using threat and vulnerability information and information on the tactics,
techniques, and procedures used by adversaries. In addition, new controls are adopted based on a better understanding
of how to mitigate information security risks to systems and organizations and risks to the privacy of individuals
arising from information processing. Finally, new controls are adopted based on new or changing requirements in laws,
policies, regulations and standards. Proposed modifications to the required controls are carefully analyzed during each
revision cycle, considering the need for stability of controls and the need to be responsive to changing technologies,
threats, vulnerabilities, types of attack, and processing methods. The objective is to adjust the level of information
security and privacy over time to meet the needs of organizations and individuals."""

def returnTitle(control):
	label = ""

	for prop in control.findall('{http://csrc.nist.gov/ns/oscal/1.0}prop'):
		if (prop.get('name') == "label" and prop.get('class') == None):
			label = prop.get('value')

	if (label == ""):
		for prop in control.findall('{http://csrc.nist.gov/ns/oscal/1.0}prop'):
			if (prop.get('name') == "label"):
				label = prop.get('value')
		
	title = control.find('{http://csrc.nist.gov/ns/oscal/1.0}title').text

	return {"label": label, "title": title}


def returnControl(control, controlType="Control"):
	title = returnTitle(control)

	if (controlType == "enhancement"):
		string = "## %s %s {#%s}\n\n" % (title['label'], title['title'], control.find("{http://csrc.nist.gov/ns/oscal/1.0}prop[@name='sort-id']").attrib['value'])
	else:
		string = "# %s %s {#%s}\n\n" % (title['label'], title['title'], control.find("{http://csrc.nist.gov/ns/oscal/1.0}prop[@name='sort-id']").attrib['value'])

	props = []

	implementationLevel = []

	for prop in control.findall('{http://csrc.nist.gov/ns/oscal/1.0}prop[@name="implementation-level"]'):
		implementationLevel.append(prop.get('value').replace('system', 'information system').title())

	if (implementationLevel):
		props.append(["Implementation Level", "; ".join(implementationLevel)])

	for prop in control.findall('{http://csrc.nist.gov/ns/oscal/1.0}prop'):
		if (prop.get('name') == "contributes-to-assurance"):
			if (prop.get('value')):
				answer = "Yes"
			else:
				answer = "No"

			props.append(["Contributes to Assurance", answer])

		if (prop.get('name') == "tx_baseline"):
			props.append(["Texas DIR Baseline", prop.get('value')])

		if (prop.get('name') == "tamus_baseline"):
			props.append(["Texas A&M System Baseline", prop.get('value')])

		if (prop.get('name') == "tx_required_by"):
			props.append(["Texas DIR Required By", prop.get('value')])

		if (prop.get('name') == "tamus_required_by"):
			props.append(["Texas A&M System Required By", prop.get('value')])

	i = 0

	for item in props:
		i += 1

		string += "_**%s**_: %s" % (item[0], item[1])

		if (i < len(props)):
			string += "\\"

		string += "\n"

	string += "\n"

	withdrawn = control.find('{http://csrc.nist.gov/ns/oscal/1.0}prop[@name="status"][@value="withdrawn"]')

	if (withdrawn is not None):
		string += "%s\n\n" % (ET.tostring(withdrawn, method='html').decode('utf-8'))

	controlStatement = control.find('{http://csrc.nist.gov/ns/oscal/1.0}part[@name="statement"]')

	if (controlStatement is not None):
		string += "### Control\n\n%s" % (returnStatement(controlStatement))

	guidanceStatement = control.find('{http://csrc.nist.gov/ns/oscal/1.0}part[@name="guidance"]')

	if (guidanceStatement is not None):
		string += "<details>\n  <summary>Supplemental Guidance</summary>\n\n%s</details>\n\n" % (returnStatement(guidanceStatement).replace('.[agency]', '.agency'))

	txStatement = control.find('{http://csrc.nist.gov/ns/oscal/1.0}part[@name="tx_implementation"]')

	if (txStatement is not None):
		string += "### Texas DIR Implementation Statement\n\n"

		withdrawn = txStatement.find('{http://csrc.nist.gov/ns/oscal/1.0}prop[@name="status"][@value="withdrawn"]')

		if (withdrawn is not None):
			string += "%s\n\n" % (ET.tostring(withdrawn, method='html').decode('utf-8'))

		string += "%s" % (returnStatement(txStatement))

	tamusStatement = control.find('{http://csrc.nist.gov/ns/oscal/1.0}part[@name="tamus_implementation"]')

	if (tamusStatement is not None):
		string += "### Texas A&M System Implementation Statement\n\n"

		withdrawn = tamusStatement.find('{http://csrc.nist.gov/ns/oscal/1.0}prop[@name="status"][@value="withdrawn"]')

		if (withdrawn is not None):
			string += "%s\n\n" % (ET.tostring(withdrawn, method='html').decode('utf-8'))

		string += "%s" % (returnStatement(tamusStatement))

	for enhancement in control.findall('{http://csrc.nist.gov/ns/oscal/1.0}control'):
		if (enhancement.get('class') == "SP800-53-enhancement"):
			string += returnControl(enhancement, controlType="enhancement")

	return string

def returnStatement(statement):
	i = 0

	string = ""

	for item in statement.iter('{http://csrc.nist.gov/ns/oscal/1.0}part'):
		i += 1

		label = item.find('{http://csrc.nist.gov/ns/oscal/1.0}prop[@name="label"]')

		content = item.find('{http://csrc.nist.gov/ns/oscal/1.0}p')

		if (content is not None):
			p = "".join( [ content.text ] + [ ET.tostring(e).decode('utf-8') for e in list(content) ] ).replace('\n','')
			p = p.replace('<CTRL> + <ALT> + <DEL>', 'CTRL-ALT-DEL').replace('<BREAK>', 'BREAK')	# Use to hack out unintended results from bad tags in guidance
			p = re.sub(' +', ' ', p)
			if (label is not None):
				if (label.get('value')[0] == "("):
					label = "    %s " % (label.get('value'))
				else:
					label = "%s " % (label.get('value'))

				string += "%s%s\n\n" % (label, p)
			else:
				string += "%s\n\n" % (p)

	if (i == 0):
			content = statement.find('{http://csrc.nist.gov/ns/oscal/1.0}p')

			if (content is not None):
				p = "".join( [ content.text ] + [ ET.tostring(e).decode('utf-8') for e in list(content) ] ).replace('\n','')
				p = p.replace('<CTRL> + <ALT> + <DEL>', 'CTRL-ALT-DEL').replace('<BREAK>', 'BREAK')	# Use to hack out unintended results from bad tags in guidance
				p = re.sub(' +', ' ', p)

				string += "%s\n\n" % (p)

	return string


parser = argparse.ArgumentParser(description='Parse an OSCAL catalog into a Docusaurus doc.')
parser.add_argument('--source', nargs=1, help='Path to OSCAL catalog source file')
parser.add_argument('--dest', nargs=1, help='Path to Docs Catalog directory')
args = parser.parse_args()

tree = ET.parse(args.source[0])
root = tree.getroot()
ET.register_namespace("", "http://csrc.nist.gov/ns/oscal/1.0")
catalog_dir = args.dest[0]

families = root.findall("{http://csrc.nist.gov/ns/oscal/1.0}group")

if os.path.exists("%s" % (catalog_dir)):
	shutil.rmtree("%s" % (catalog_dir))

os.mkdir("%s" % (catalog_dir))

f = open("%s/README.md" % (catalog_dir), "w")

f.write("---\ncustom_edit_url: null\nsidebar_position: 1\n---\n\n# Security Control Standards Catalog\n\n%s" % (intro_text))

f.close()

for family in families:

	os.mkdir("%s/%s" % (catalog_dir, family.get('id')))

	data = {
		"label": "%s - %s" % (family.get('id').upper(), family.find('{http://csrc.nist.gov/ns/oscal/1.0}title').text)
	}

	f = open("%s/%s/_category_.json" % (catalog_dir, family.get('id')), "w")

	f.write(json.dumps(data))

	f.close()

	for control in family.findall('{http://csrc.nist.gov/ns/oscal/1.0}control'):
		if (control.get('class') == "SP800-53"):
			for prop in control.findall('{http://csrc.nist.gov/ns/oscal/1.0}prop'):
				if (prop.get('name') == "sort-id"):
					sort_id = prop.get('value')

			title = returnTitle(control)

			f = open("%s/%s/%s.md" % (catalog_dir, family.get('id'), sort_id), "w")

			front_matter  = "---\n"
			front_matter += "custom_edit_url: %s\n" % (custom_edit_url)
			front_matter += "toc_min_heading_level: 2\n"
			front_matter += "toc_max_heading_level: 2\n"
			front_matter += "title: %s %s\n" % (title['label'], title['title'])
			front_matter += "description: \"\"\n"
			front_matter += "---\n\n"

			f.write(front_matter)

			f.write(returnControl(control))

			f.close()