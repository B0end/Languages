import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

interface LanguageCardProps {
  flag: string;
  title: string;
  nativeTitle: string;
  description: string;
  docPath: string;
  status: 'Complete' | 'In Progress' | 'Planned';
}

const LANGUAGES: LanguageCardProps[] = [
  {
    flag: '🇵🇹',
    title: 'Portuguese',
    nativeTitle: 'Português',
    description: 'Master European and Brazilian Portuguese grammar, vocabulary, and common idioms.',
    docPath: '/docs-portuguese/category/from-spanish',
    status: 'In Progress',
  },
  {
    flag: '🇨🇳',
    title: 'Chinese',
    nativeTitle: '中文',
    description: 'Mandarin guides covering Pinyin, HSK vocabulary, sentence structures, and hanzi.',
    docPath: '/docs-chinese/category/basics',
    status: 'In Progress',
  },
  {
    flag: '🇷🇺',
    title: 'Russian',
    nativeTitle: 'Русский',
    description: 'Learn the Cyrillic alphabet, noun cases, verb aspects, and essential conversational skills.',
    docPath: '/docs-russian/category/basics',
    status: 'In Progress',
  },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started Reading 📚
          </Link>
        </div>
      </div>
    </header>
  );
}

function LanguageCard({ flag, title, nativeTitle, description, docPath, status }: LanguageCardProps) {
  const statusBadgeMap = {
    'Complete': 'badge--success',
    'In Progress': 'badge--info',
    'Planned': 'badge--secondary',
  };

  return (
    <div className="col col--4 margin-bottom--lg">
      <div className={clsx('card', styles.languageCard)}>
        <div className="card__header">
          <div className={styles.cardTitleWrapper}>
            <span className={styles.flagIcon} role="img" aria-label={title}>
              {flag}
            </span>
            <div>
              <Heading as="h3" className="margin-bottom--none">
                {title}
              </Heading>
              <small className="text--muted">{nativeTitle}</small>
            </div>
          </div>
        </div>
        <div className="card__body">
          <p>{description}</p>
        </div>
        <div className={clsx('card__footer', styles.cardFooter)}>
          <span className={clsx('badge', statusBadgeMap[status])}>
            {status}
          </span>
          <Link className="button button--primary button--sm" to={docPath}>
            Open Book
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Comprehensive open-source documentation and study books for learning world languages.">
      <HomepageHeader />
      <main className="container margin-vert--xl">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2">Select a Language</Heading>
          <p className="text--muted">Browse through our structured learning paths and guides</p>
        </div>
        <div className="row">
          {LANGUAGES.map((lang, idx) => (
            <LanguageCard key={idx} {...lang} />
          ))}
        </div>
      </main>
    </Layout>
  );
}