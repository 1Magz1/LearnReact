import { Text } from 'shared/ui/Text';
import { useTranslation } from 'react-i18next';

const ArticleDetailsPage = () => {
  const { t } = useTranslation('articleDetails');
  return (
    <div>
      <Text variant="h1">{t('title')}</Text>
      <span>Content</span>
    </div>
  );
};

export default ArticleDetailsPage;
