import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function MainPage() {
  const { t, i18n } = useTranslation('main');

  useEffect(() => {
    if (Math.random() > 0.5) {
      throw new Error();
    }
  }, []);

  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  );
}

export default MainPage;
