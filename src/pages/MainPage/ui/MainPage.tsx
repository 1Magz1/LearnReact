import { useTranslation } from 'react-i18next';
import { Counter } from 'entities/Counter';

function MainPage() {
  const { t } = useTranslation('main');

  return (
    <div className="page-wrapper">
      <h1>{t('title')}</h1>
      <Counter />
    </div>
  );
}

export default MainPage;
