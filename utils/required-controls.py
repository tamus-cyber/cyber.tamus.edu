import argparse
import os
import re
import yaml

# Set the custom edit URL for each page
custom_edit_url = "https://github.com/tamus-cyber/tamus-control-standards/tree/main/content/tamus.edu/TAMUS_profile.yaml"

# Function to inspect a control for the required flags and include in output
def process_control(control, filtered_controls):
    dict = {}
    implementation = []
    dict['tx_required_by'] = ""
    dict['tx_baseline'] = ""
    dict['tamus_required_by'] = ""
    dict['tamus_baseline'] = ""

    if 'props' in control:
        for prop in control['props']:
            if (prop.get('name') == "implementation-level"):
                implementation.append(prop.get('value', '')[0].upper())

            if (prop.get('name') in ['tx_baseline', 'tamus_baseline']):
                dict[prop.get('name')] = f"{prop.get('value', '')[0]}"

            if (prop.get('name') in ['tx_required_by', 'tamus_required_by', 'tx_new_requirement', 'tamus_new_requirement']):
                dict[prop.get('name')] = f"{prop.get('value', '')}"

    if (dict['tx_required_by'] != "" or dict['tamus_required_by'] != ""):
        dict['title'] = get_link_to_control(control)
        dict['implementation'] = ' '.join(implementation)

        if ('tx_new_requirement' in dict):
            dict['tx_required_by'] = "<span class=\"new-requirement\">%s</span>" % (dict['tx_required_by'])

        if ('tamus_new_requirement' in dict):
            dict['tamus_required_by'] = "<span class=\"new-requirement\">%s</span>" % (dict['tamus_required_by'])

        filtered_controls.append(dict)

    return filtered_controls

# Function to get the sort-id from props
def get_sort_id(control):
    for prop in control.get('props', []):
        if prop.get('name') == 'sort-id':
            return prop.get('value', '')
    return ''

# Function to get the label without class "zero-padded" from props
def get_non_padded_label(control):
    for prop in control.get('props', []):
        if prop.get('name') == 'label' and 'class' not in prop:
            return prop.get('value', '')
    return ''

# Function to create url to a control page and anchor to the enhancement
def get_link_to_control(control):
    id = get_sort_id(control)
    label = get_non_padded_label(control)
    title = control.get('title', '')
    pattern = r"((\w{2})(?:-)(\d{1,2})?)(?:\.(\d{1,2}))?(?:_smt\.(\w))?"
    match = re.search(pattern, id)
    if (match[0] != match[1]):
        return "[%s %s](/catalog/%s/%s#%s)" % (label, title, match[2], match[1], match[0])
    else:
        return "[%s %s](/catalog/%s/%s)" % (label, title, match[2], match[1])

# Read the YAML file
parser = argparse.ArgumentParser(description='Parse a YAML OSCAL catalog into a Docusaurus doc.')
parser.add_argument('--source', nargs=1, help='Path to OSCAL catalog sourxe file')
parser.add_argument('--dest', nargs=1, help='Path to Docs catalog directory')
args = parser.parse_args()

# Define the catalog directory
catalog_dir = args.dest[0]

# Load the YAML file
yaml_file_path = args.source[0]

# Load the contents of the YAML file
with open(yaml_file_path, 'r') as file:
    yaml_content = yaml.safe_load(file)

# Iterate over the controls and create an ODP and label index
odp = {}
labels = {}

for group in yaml_content['catalog']['groups']:
    id = group.get('id', '')
    labels[id] = id.upper()

    for control in group.get('controls', []):
        id = get_sort_id(control)
        labels[id] = get_non_padded_label(control)

        for enhancement in control.get('controls', []):
            id = get_sort_id(enhancement)
            labels[id] = get_non_padded_label(enhancement)

# Extract relevant controls
filtered_controls = []

for group in yaml_content['catalog']['groups']:
    filtered_controls.append({'group': "%s (%s)" % (group.get('title', ''), group.get('id', '').upper())})

    for control in group.get('controls', []):
        filtered_controls = process_control(control, filtered_controls)

        for enhancement in control.get('controls', []):
            filtered_controls = process_control(enhancement, filtered_controls)

# Generate Markdown table
markdown_table = "| Title | Texas DIR Required By | DIR Baseline | Texas A&M System Required By | TAMUS Baseline | Org/Info System Control |\n"
markdown_table += "|:-------|:-----------:|:-----------:|:------------:|:------------:|:------------:|\n"

for control in filtered_controls:
    if ('group' in control):
        markdown_table += f"| <heading>{control['group']}</heading> |||||\n"
    else:
        markdown_table += f"| {control['title']} | {control['tx_required_by']} | {control['tx_baseline']} | {control['tamus_required_by']} | {control['tamus_baseline']} | {control['implementation']} |\n"

# Output the Markdown table
f = open("%s/required-controls.md" % (catalog_dir), "w")

f.write("---\n")
f.write("custom_edit_url: %s\n" % (custom_edit_url))
f.write("title: Required Security Control Standards\n")
f.write("sidebar_position: 2\n")
f.write("---\n\n")

f.write(":::note\n\nShaded box denotes a new requirement since the last release.\n\n:::\n\n")

f.write(markdown_table)

f.close()
