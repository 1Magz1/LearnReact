import { useTranslation } from 'react-i18next';

function AboutPage() {
  const { t, i18n } = useTranslation('about');

  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  );
}
export default AboutPage;
