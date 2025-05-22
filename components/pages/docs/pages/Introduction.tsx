import React from 'react';
import { useTranslation } from 'react-i18next';
import { DocContent } from '../DocContent';

export function Introduction() {
  const { t } = useTranslation();

  const content = (
    <>
      <p>{t('introduction.welcome')}</p>

      <h2>{t('introduction.what_is_title')}</h2>
      <p>{t('introduction.what_is_text')}</p>

      <h2>{t('introduction.features_title')}</h2>
      <ul>
        <li>{t('introduction.features.0')}</li>
        <li>{t('introduction.features.1')}</li>
        <li>{t('introduction.features.2')}</li>
        <li>{t('introduction.features.3')}</li>
        <li>{t('introduction.features.4')}</li>
        <li>{t('introduction.features.5')}</li>
        <li>{t('introduction.features.6')}</li>
      </ul>

      <h2>{t('introduction.audience_title')}</h2>
      <p>{t('introduction.audience_intro')}</p>
      <ul>
        <li>{t('introduction.audience.0')}</li>
        <li>{t('introduction.audience.1')}</li>
        <li>{t('introduction.audience.2')}</li>
        <li>{t('introduction.audience.3')}</li>
        <li>{t('introduction.audience.4')}</li>
      </ul>

      <h2>{t('introduction.getting_started_title')}</h2>
      <p>{t('introduction.getting_started_intro')}</p>
      <ol>
        <li>{t('introduction.getting_started.0')}</li>
        <li>{t('introduction.getting_started.1')}</li>
        <li>{t('introduction.getting_started.2')}</li>
        <li>{t('introduction.getting_started.3')}</li>
        <li>{t('introduction.getting_started.4')}</li>
      </ol>

      <h2>{t('introduction.requirements_title')}</h2>
      <p>{t('introduction.requirements_text')}</p>
      <ul>
        <li>{t('introduction.requirements.0')}</li>
        <li>{t('introduction.requirements.1')}</li>
        <li>{t('introduction.requirements.2')}</li>
        <li>{t('introduction.requirements.3')}</li>
      </ul>
    </>
  );

  return (
    <DocContent
      title={t('introduction.page_title')}
      description={t('introduction.page_description')}
      lastUpdated="2024-02-20"
      content={content}
      nextPage={{
        title: t('introduction.next.title'),
        href: '/docs/quickstart',
      }}
      relatedDocs={[
        {
          title: t('introduction.related.core'),
          href: '/docs/concepts',
        },
        {
          title: t('introduction.related.subscriptions'),
          href: '/docs/subscriptions',
        },
      ]}
    />
  );
}
