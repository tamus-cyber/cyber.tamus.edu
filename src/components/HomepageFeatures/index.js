import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const CyberOpsFeatureList = [
  {
    title: 'Managed Detection & Response',
    Svg: require('@site/static/img/undraw-security-on.svg').default,
    svgAlt: 'A man in a business suit looking at a security shield.',
    description: (
      <>
        The MDR service monitors your endpoints and network for signs of malicious activity. Cyber analysts then filter out false positives and only escalate actionable items as alerts, alleviating alert fatigue and saving you time and effort.
      </>
    ),
    ctaText: 'Contact Us',
    ctaLink: 'https://tamus-cyber.atlassian.net/servicedesk/customer/portal/76/group/111/create/591',
  },
  {
    title: 'Incident Response',
    Svg: require('@site/static/img/undraw-engineering-team.svg').default,
    svgAlt: 'A group of workers with laptop computers gathered around a table.',
    description: (
      <>
        We provide full-service incident response (IR) for threats identified through the MDR service. IR services can be delivered remotely or on-the-ground, depending on the incident's nature and scope.
      </>
    ),
    ctaText: 'Contact Us',
    ctaLink: 'https://tamus-cyber.atlassian.net/servicedesk/customer/portal/76/group/111/create/591',
  },
];

const CyberSharedServicesFeatureList = [
  {
    title: 'Cyber Risk Management',
    Svg: require('@site/static/img/undraw-safe.svg').default,
    svgAlt: 'A woman reviewing a security-related web page.',
    description: (
      <>
        We conduct strategic analyses of open sources to identify cyber risks to your organization. Our analysts feed this information into our workflow to assist with cyber risk mitigation. Actionable items are also delivered to you for mitigation.
      </>
    ),
    ctaText: 'Contact Us',
    ctaLink: 'https://tamus-cyber.atlassian.net/servicedesk/customer/portal/76/group/111/create/591',
  },
  {
    title: 'Information Sharing & Analysis',
    Svg: require('@site/static/img/undraw-sharing-articles.svg').default,
    svgAlt: 'A man and woman exchanging content on mobile devices.',
    description: (
      <>
        The 19 members of the Texas A&M System form a robust information sharing and analysis organization. We also directly support the State of Texas Information Sharing & Analysis Organization (TX-ISAO).
      </>
    ),
    ctaText: 'Contact Us',
    ctaLink: 'https://tamus-cyber.atlassian.net/servicedesk/customer/portal/76/group/111/create/591',
  },
];

function Feature({Svg, svgAlt, title, description, ctaText, ctaLink}) {
   return (
    <div className={clsx('col col--6')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" aria-label={svgAlt} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h2">{title}</Heading>
        <p>{description}</p>
        <a className="button button--primary button--md" href={ctaLink}>{ctaText}</a>
      </div>
    </div>
  );
}

function FeatureSection({title, items}) {
  return (
    <div className="container">
      <div className="row">
        <div className={clsx('col col--12')}>
          <div className="text--center">
            <Heading as="h1">{title}</Heading>
          </div>
        </div>
      </div>
      <div className="row">
        {items.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <>
    <section className={styles.features}>
        <FeatureSection title="Cyber Operations" items={CyberOpsFeatureList} />
    </section>
    <section className={styles.features}>
        <FeatureSection title="Cyber Shared Services" items={CyberSharedServicesFeatureList} />
    </section>
    </>
  );
}