import argparse
import html
import json
import os
import re
import shutil
import yaml

# Set the custom edit URL for each page
custom_edit_url = "https://github.com/tamus-cyber/tamus-control-standards/tree/main/content/tamus.edu/TAMUS_profile.yaml"

# Set the static intro page text
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


# Function to substitute {{ insert }} tags with the corresponding param values
def substitute_insert_tags(prose, params, odp):
    # Regex pattern to find {{ insert: param_id }}
    pattern = r"\{\{\s*insert: param, (.*?)\s*\}\}"
    
    def replace_match(match):
        param_id = match.group(1)

        if (param_id in odp):
            param = odp[param_id]

            if 'select' in param:
                how_many = ""

                if (param['select'].get('how-many', '') != ""):
                    how_many = " (%s)" % (param['select'].get('how-many', ''))

                return "<strong title=\"%s\"> <em>[Selection%s: %s]</em> </strong>" % (param['id'], how_many, substitute_insert_tags('; '.join(param['select'].get('choice', '')), params, odp))

            if 'label' in param:
                return "<strong title=\"%s\"> <em>[Assignment: %s]</em> </strong>" % (param['id'], substitute_insert_tags(param.get('label', ''), params, odp))  # Replace with the 'label' of the matching param
        
            return "<strong> <em>[Could not substitute parameter %s]</em> </strong>" % (param_id)  # If no match, return error message in text

        return "<strong> <em>[Could not match parameter %s]</em> </strong>" % (param_id)
    
    return re.sub(pattern, replace_match, prose)

# Function to substitute links in the catalog
def replace_links(text, replacements):
    # Define the regex pattern to find the links
    pattern = r"\[([^\]]+)\]\(#([^\)]+)\)"
    
    # Function to replace the found pattern with the corresponding dictionary value
    def replacer(match):
        link_text = match.group(1)
        control_pattern = r"((\w{2})(?:-)(\d{1,2})?)(?:\.(\d{1,2}))?(?:_smt\.(\w))?"
        key = re.sub(control_pattern, pad_with_zeros, match.group(2))

        if key in replacements:
            control_match = re.search(control_pattern, key)
            control = ""

            if (control_match):
                if (control_match[5] is not None):
                    control = "[%s%s](/catalog/%s/%s#%s)" % (replacements[key], control_match[5], control_match[2], control_match[1], control_match[1])
                else:
                    if (control_match[0] != control_match[1]):
                        control = "[%s](/catalog/%s/%s#%s)" % (replacements[key], control_match[2], control_match[1], control_match[0])
                    else:
                        control = "[%s](/catalog/%s/%s)" % (replacements[key], control_match[2], control_match[1])

            return control
        else:
            return match.group(0)  # If no replacement is found, return the original string
    
    # Substitute the pattern with the replacement values
    result = re.sub(pattern, replacer, text)
    return result

# Function to pad IDs to match the sort-id property
def pad_with_zeros(match):
    groups = match.groups()
    
    # Pad any group with less than 2 characters with zeros
    padded_groups = []
    for g in groups:
        if g and len(g) < 2:
            padded_groups.append(g.zfill(2))
        else:
            padded_groups.append(g if g else '')
    
    # Reconstruct the string from the padded groups
    string = ""

    if (padded_groups[1]):
        string = padded_groups[1]

    if (padded_groups[2]):
        string += "-%s" % (padded_groups[2])

    if (padded_groups[3]):
        string += ".%s" % (padded_groups[3])

    if (padded_groups[4]):
        string += "_smt.%s" % (groups[4])

    return string

# Function to process a withdrawn control/enhancement
def process_withdrawn(links, labels):
    dest = []

    for link in links:
        href = link.get('href', '').replace('#', '')

        # Regex pattern to find statements in links
        pattern = r"((\w{2})(?:-)(\d{1,2})?)(?:\.(\d{1,2}))?(?:_smt\.(\w))?"

        match = re.sub(pattern, pad_with_zeros, href)
        match = re.search(pattern, match)

        if (match):
            if (match[5] is not None):
                control = "[%s%s](/catalog/%s/%s#%s)" % (labels[match[1]], match[5], match[2], match[1], match[1])
            else:
                if (match[0] != match[1]):
                    control = "[%s](/catalog/%s/%s#%s)" % (labels[match[0]], match[2], match[1], match[0])
                else:
                    control = "[%s](/catalog/%s/%s)" % (labels[match[0]], match[2], match[1])

            if (link.get('rel') == "incorporated-into"):
                dest.append("; incorporated into %s" % (control))
            if (link.get('rel') == "moved-to"):
                dest.append("; moved to %s" % (control))

    f.write("<em>[Withdrawn%s.]</em>\n\n" % (''.join(dest)))

# Function to process the generation of control language
def process_control(control, odp, labels, f):
    withdrawn = False

    control_title = ("%s %s" % (get_non_padded_label(control.get('props', [])), control.get('title', '')))

    if (control.get('class') == "SP800-53"):
        f.write("\n\n# %s {#%s}\n\n" % (control_title, get_sort_id(control.get('props', []))))
    elif (control.get('class') == "SP800-53-enhancement"):
        f.write("\n\n## %s {#%s}\n\n" % (control_title, get_sort_id(control.get('props', []))))

    props = []

    implementationLevels = [prop for prop in control.get('props', []) if prop.get('name') == 'implementation-level']

    implementationLevel = []

    if (len(implementationLevels)):
        for item in implementationLevels:
            implementationLevel.append(item.get('value', '').replace('system', 'information system').title())

        props.append(["Implementation Level", "; ".join(implementationLevel)])

    for prop in control.get('props', []):
        if (prop.get('name') == "contributes-to-assurance"):
            if (prop.get('value')):
                answer = "Yes"
            else:
                answer = "No"

            props.append(["Contributes to Assurance", answer])

        if (prop.get('name') == "tx_baseline"):
            props.append(["Texas DIR Baseline", prop.get('value', '')])

        if (prop.get('name') == "tx_privacy_baseline"):
            if (prop.get('value')):
                answer = "Yes"
            else:
                answer = "No"

            props.append(["Texas DIR Privacy Baseline", answer])

        if (prop.get('name') == "tamus_baseline"):
            props.append(["Texas A&M System Baseline", prop.get('value', '')])

        if (prop.get('name') == "tx_required_by"):
            props.append(["Texas DIR Required By", prop.get('value', '')])

        if (prop.get('name') == "tamus_required_by"):
            props.append(["Texas A&M System Required By", prop.get('value', '')])

        if (prop.get('name') == "status" and prop.get('value') == "withdrawn"):
            withdrawn = True

    i = 0
    
    for item in props:
        i += 1

        f.write("_**%s**_: %s" % (item[0], item[1]))

        if (i < len(props)):
            f.write("\\\n")
        else:
            f.write("\n")

    if (len(props)):
        f.write("\n")

    params = control.get('params', [])
    
    # Filter parts to only those with name equal to "statement"
    statement_parts = [part for part in control.get('parts', []) if part.get('name') == 'statement']
    
    f.write("### Control\n\n")

    if (withdrawn):
        process_withdrawn(control.get('links', []), labels)

    for part in statement_parts:
        # Process the top-level part
        process_parts([part], params, odp, f)

    # Filter parts to only those with name equal to "guidance"
    guidance_part = [part for part in control.get('parts', []) if part.get('name') == 'guidance']

    if (len(guidance_part)):
        guidance = replace_links(guidance_part[0].get('prose', ''), labels)

        f.write("\n<details><summary>Supplemental Guidance</summary>%s</details>\n" % (re.sub('\n', '<br/>', guidance)))

    # Filter parts to only those with name equal to "tx_implementation"
    tx_implementation_parts = [part for part in control.get('parts', []) if part.get('name') == 'tx_implementation']

    if (len(tx_implementation_parts)):
        tx_withdrawn = False

        for prop in tx_implementation_parts[0].get('props', []):
            if prop.get('name') == 'status' and prop.get('value') == 'withdrawn':
                tx_withdrawn = True

        f.write("\n### Texas DIR Implementation Statement\n\n")

        if (tx_withdrawn):
            process_withdrawn(tx_implementation_parts[0].get('links', []), labels)

        for part in tx_implementation_parts:
            # Process the top-level part
            process_parts([part], params, odp, f)

    # Filter parts to only those with name equal to "tamus_implementation"
    tamus_implementation_parts = [part for part in control.get('parts', []) if part.get('name') == 'tamus_implementation']

    if (len(tamus_implementation_parts)):
        tamus_withdrawn = False

        for prop in tamus_implementation_parts[0].get('props', []):
            if prop.get('name') == 'status' and prop.get('value') == 'withdrawn':
                tamus_withdrawn = True

        f.write("\n### Texas A&M System Implementation Statement\n\n")

        if (tamus_withdrawn):
            process_withdrawn(tamus_implementation_parts[0].get('links', []), labels)

        for part in tamus_implementation_parts:
            # Process the top-level part
            process_parts([part], params, odp, f)

# Recursive function to process parts and their sub-parts
def process_parts(parts, params, odp, f):
    for part in parts:
        label = "%s" % (get_non_padded_label(part.get('props', [])))
        if (label != ""):
            if (label[0] == "("):
                label = "    %s " % (label)
            else:
                label = "%s " % (label)

        prose = part.get('prose', '')
        substituted_prose = substitute_insert_tags(prose, params, odp)
        substituted_prose = replace_links(substituted_prose, labels)
        f.write(f"{label}{substituted_prose}\n\n")
        
        # Recursively process sub-parts if they exist
        sub_parts = part.get('parts', [])
        if sub_parts:
            process_parts(sub_parts, params, odp, f)

# Function to get the label without class "zero-padded" from props
def get_non_padded_label(props):
    for prop in props:
        if prop.get('name') == 'label' and 'class' not in prop:
            return prop.get('value', '')
    return ''

# Function to get the sort-id from props
def get_sort_id(props):
    for prop in props:
        if prop.get('name') == 'sort-id':
            return prop.get('value', '')
    return ''


# Read the YAML file
parser = argparse.ArgumentParser(description='Parse a YAML OSCAL catalog into a Docusaurus doc.')
parser.add_argument('--source', nargs=1, help='Path to OSCAL catalog sourxe file')
parser.add_argument('--dest', nargs=1, help='Path to Docs catalog directory')
args = parser.parse_args()

# Define the catalog directory
catalog_dir = args.dest[0]

# Load the YAML file
yaml_file_path = args.source[0]

with open(yaml_file_path, 'r') as file:
    data = yaml.safe_load(file)

# Iterate over the controls and create an ODP and label index
odp = {}
labels = {}

for group in data.get('catalog', {}).get('groups', []):
    id = group.get('id', '')
    labels[id] = id.upper()

    for control in group.get('controls', []):
        id = get_sort_id(control.get('props', []))
        labels[id] = get_non_padded_label(control.get('props', []))

        for param in control.get('params', []):
            id = param.get('id')
            odp[id] = param

        for enhancement in control.get('controls', []):
            id = get_sort_id(enhancement.get('props', []))
            labels[id] = get_non_padded_label(enhancement.get('props', []))

            for param in enhancement.get('params', []):
                id = param.get('id')
                odp[id] = param

# Iterate over the controls and create file structure
if os.path.exists("%s" % (catalog_dir)):
    shutil.rmtree("%s" % (catalog_dir))

os.mkdir("%s" % (catalog_dir))

f = open("%s/README.md" % (catalog_dir), "w")

f.write("---\ncustom_edit_url: null\nsidebar_position: 1\n---\n\n# Security Control Standards Catalog\n\n%s" % (intro_text))

f.close()

for group in data.get('catalog', {}).get('groups', []):
    os.mkdir("%s/%s" % (catalog_dir, group.get('id', '')))

    data = {
        "label": "%s - %s" % (group.get('id', '').upper(), group.get('title', ''))
    }

    f = open("%s/%s/_category_.json" % (catalog_dir, group.get('id', '')), "w")

    f.write(json.dumps(data))

    f.close()

    for control in group.get('controls', []):
        f = open("%s/%s/%s.md" % (catalog_dir, group.get('id', ''), get_sort_id(control.get('props', []))), "w")

        control_title = ("%s %s" % (get_non_padded_label(control.get('props', [])), control.get('title', '')))

        f.write("---\n")
        f.write("custom_edit_url: %s\n" % (custom_edit_url))
        f.write("toc_min_heading_level: 2\n")
        f.write("toc_max_heading_level: 2\n")
        f.write("title: %s\n" % (control_title))
        f.write("description: \"\"\n")
        f.write("---")

        process_control(control, odp, labels, f)

        for enhancement in control.get('controls', []):
            process_control(enhancement, odp, labels, f)

        f.close()