#!/bin/bash

Help()
{
	echo "Build the TAMUS control standards catalog in Docusaurus using an OSCAL resolved catalog"
	echo
	echo "Syntax: build-docusaurus-catalog [Path to POM] [Path to Resolved Catalog XML Source] [Path to Docs Catalog]"
	echo
}

if ! [ -x "$(command -v mvn)" ]; then
  echo 'Error: Maven (mvn) is not in the PATH, is it installed?' >&2
  exit 1
fi

# This command runs the XSL transform to populate XML <insert> tags found in the OSCAL resolved catalog XML

mvn -f $1/pom.xml exec:java -Dexec.mainClass="net.sf.saxon.Transform" -Dexec.args="-xsl:oscal-populate-inserts.xsl -s:$2 -o:/tmp/catalog.xml"

# This command runs the Python script to generate the Markdown pages that form the catalog

python3 docusaurus-catalog.py --source=/tmp/catalog.xml --dest=$3

# This command runs the XSL transform to create an HTML file of required security controls from the OSCAL resolved catalog XML

mvn -f $1/pom.xml exec:java -Dexec.mainClass="net.sf.saxon.Transform" -Dexec.args="-xsl:oscal-tamus-required-controls.xsl -s:$2 -o:$3/required-controls.md"
echo '---\ntitle: Required Security Control Standards\nsidebar_position: 2\n---\n' | cat - $3/required-controls.md > /tmp/required-controls.md && mv /tmp/required-controls.md $3
sed -i'' -e 's/<?xml version="1.0" encoding="UTF-8"?>//g' $3/required-controls.md
rm $3/required-controls.md-e

# This cleans up the temporary XML file created by step 1

rm /tmp/catalog.xml
