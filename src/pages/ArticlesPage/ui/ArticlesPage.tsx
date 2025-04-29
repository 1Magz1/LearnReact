import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text';

const ArticlesPage = () => {
  const { t } = useTranslation('articles');
  return (
    <>
      <Text variant="h1">{t('title')}</Text>
      <span>Content</span>
    </>
  );
};

export default ArticlesPage;
