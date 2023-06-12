import { useTranslation } from 'react-i18next';

function MainPage() {
  const { t, i18n } = useTranslation('main');

  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  );
}

export default MainPage;
