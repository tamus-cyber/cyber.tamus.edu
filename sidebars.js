/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  catalogSidebar: [
    {
      type: 'autogenerated', 
      dirName: 'catalog',
    },
  ],

  guidelinesSidebar: [
    {
      type: 'autogenerated', 
      dirName: 'policy/guidelines',
    },
  ],

  resourcesSidebar: [
    {
      type: 'autogenerated', 
      dirName: 'policy/resources',
    },
    {
      type: 'link',
      label: 'FIPS 199 Impact Table',
      href: 'https://doi.org/10.6028/NIST.FIPS.199',
    },
    {
      type: 'link',
      label: 'Impact Calculator',
      href: 'https://it.tamu.edu/community/tools/impact-calculator.php',
    },
    {
      type: 'link',
      label: 'NIST SP 800-53r5',
      href: 'https://doi.org/10.6028/NIST.SP.800-53r5',
    },    
  ],
};

export default sidebars;