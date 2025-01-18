// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Texas A&M System Cybersecurity',
  favicon: 'img/favicon.ico',
  tagline: `Texas A&M System Cybersecurity leads the System's effort to manage and reduce risk to our cyber infrastructure. We deliver resources and tools to our customers to help them ensure a secure and resilient infrastructure.`,

  // Set the production url of your site here
  url: 'https://cyber.tamus.edu',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'tamus-cyber', // Usually your GitHub org/user name.
  projectName: 'cyber.tamus.edu', // Usually your repo name.
  trailingSlash: true, // Force trailing slash.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  customFields: {
    policyTitle: 'Texas A&M System Cybersecurity Policy',
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/tamus-cyber/cyber.tamus.edu/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          // 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'monthly',
          priority: 0.5,
          ignorePatterns: ['/catalog/**'],
          filename: 'sitemap.xml',
        }
      }),
    ],
  ],

  plugins: [
    'docusaurus-lunr-search',
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      //image: 'img/docusaurus-social-card.jpg',
      /*
      announcementBar: {
        id: 'dev_site',
        content:
          '⚠️ This is a development version of the website and is not officially released content ⚠️',
        backgroundColor: '#ff0000',
        textColor: '#ffffff',
      },
      */
      navbar: {
        //title: 'Cybersecurity Standards',
        logo: {
          alt: 'Texas A&M System Cybersecurity Logo',
          src: 'img/tamus-cyber-logo.svg',
          srcDark: 'img/tamus-cyber-logo-white.svg',
        },
        items: [
          {to: '/', label: 'Home', position: 'left'},
          {
            type: 'dropdown',
            to: '/policy/',
            label: 'Policy',
            position: 'left',
            items: [
              {to: '/policy/standards/', label: 'Regulations & Standards'},
              {
                type: 'docSidebar',
                sidebarId: 'catalogSidebar',
                label: 'Control Standards Catalog',
              },
              {
                type: 'docSidebar',
                sidebarId: 'guidelinesSidebar',
                label: 'Guidelines',
              },
              {
                type: 'docSidebar',
                sidebarId: 'resourcesSidebar',
                label: 'Resources',
              },
            ],
          },
          {to: '/blog/', label: 'Blog', position: 'left'},
          {
            type: 'dropdown',
            to: '/contact/',
            label: 'Contact',
            position: 'left',
            items: [
              {
                to: '/contact/',
                label: 'Contact Us',
              },
              {
                href: 'https://public.govdelivery.com/accounts/TXAMUSCS/signup/44174',
                label: 'Subscribe to Updates',
              },
              {
                to: '/vuln-report/',
                label: 'Report a Vulnerability',
              }],
          },
          {
            href: 'https://portal.cyber.tamus.edu/',
            label: 'ISAO Portal',
            position: 'left',
          },
          {
            href: 'https://github.com/tamus-cyber/cyber.tamus.edu/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        links: [
          {
            label: 'State of Texas',
            href: 'https://www.texas.gov/',
          },
          {
            label: 'Texas Homeland Security',
            href: 'https://gov.texas.gov/organization/hsgd/',
          },
          {
            label: 'Texas Veterans Portal',
            href: 'https://veterans.portal.texas.gov/',
          },
          {
            label: 'Statewide Search',
            href: 'https://www.tsl.texas.gov/trail/',
          },
          {
            label: 'Risk, Fraud & Misconduct Hotline',
            href: 'https://secure.ethicspoint.com/domain/media/en/gui/19681/',
          },
          {
            label: 'Privacy',
            href: 'https://www.tamus.edu/marcomm/reports/privacy/',
          },
          {
            label: 'Web Accessibility',
            href: 'https://www.tamus.edu/marcomm/reports/accessibility/',
          },
          {
            label: 'State Link Policy',
            href: 'https://dir.texas.gov/resource-library-item/state-website-linking-privacy-policy/',
          },
          {
            label: 'Campus Carry',
            href: 'https://www.tamus.edu/system/campus-carry-rules/',
          },
        ],
        copyright: `<p>Copyright © ${new Date().getFullYear()} The Texas A&M University System. All rights reserved.</p>1370 TAMU, College Station, TX 77843-1370 | phone: (979) 234-0030 | email: <a href="mailto:contact@cyber.tamus.edu">contact@cyber.tamus.edu</a>`,
        logo: {
          alt: 'The Texas A&M University System',
          src: '/img/tamus-primary-white.png',
          href: 'https://www.tamus.edu/',
          height: 85,
        }
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
