import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Regulations & Standards',
    Svg: require('@site/static/img/undraw-books.svg').default,
    svgAlt: 'A man reading a policy book.',
    href: '/policy/standards/',
    description: (
      <>
        Regulations and standards provide system members with guidance that enhances State-level requirements and system policy for implementing information security.
      </>
    ),
  },
  {
    title: 'Guidelines',
    Svg: require('@site/static/img/undraw-directions.svg').default,
    svgAlt: 'A woman reviewing guidelines on a mobile device.',
    href: '/policy/guidelines/',
    description: (
      <>
        Guidelines provide enhanced direction to system members for implementing the security control standards established by the control standards catalog.
      </>
    ),
  },
  {
    title: 'Resources',
    Svg: require('@site/static/img/undraw-helpful-sign.svg').default,
    svgAlt: 'A man looking at a sign with resource information.',
    href: '/policy/resources/',
    description: (
      <>
        Resources are available to assist system members in their implementation of cybersecurity standards.
      </>
    ),
  },
];

function Feature({Svg, svgAlt, title, href, description}) {
  return (
    <div className={clsx('col col--4')}>
      <a href={href}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" aria-label={svgAlt} />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h2">{title}</Heading>
          <p>{description}</p>
        </div>
      </a>
    </div>
  );
}

export default function PolicyFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
