import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import PolicyFeatures from '@site/src/components/PolicyFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function PolicyHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.customFields.policyTitle}
        </Heading>
        <p className="hero__subtitle">{siteConfig.customFields.policyTagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/catalog">
            Texas A&amp;M System Control Standards Catalog
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.customFields.policyTitle}
      description="Description will go into a meta tag in <head />">
      <PolicyHeader />
      <main>
        <PolicyFeatures />
      </main>
    </Layout>
  );
}
