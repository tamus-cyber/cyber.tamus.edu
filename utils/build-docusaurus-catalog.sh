#!/bin/bash

Help()
{
	echo "Build the TAMUS control standards catalog in Docusaurus using an OSCAL resolved catalog"
	echo
	echo "Syntax: build-docusaurus-catalog [Path to Resolved Catalog YAML Source] [Path to Docs Catalog]"
	echo
}

# This command runs the Python script to generate the Markdown pages that form the catalog

python3 docusaurus-catalog.py --source=$1 --dest=$2

# This command runs the Python script to generate the Markdown pages that form the catalog's required controls page

python3 required-controls.py --source=$1 --dest=$2
