import { useTranslation } from 'react-i18next';
import { Box } from 'shared/ui/Box';
import { Text } from 'shared/ui/Text';

function AboutPage() {
  const { t } = useTranslation('about');

  return (
    <Box className="page-wrapper" variant="section">
      <Text variant="h1">{t('title')}</Text>
    </Box>
  );
}
export default AboutPage;
