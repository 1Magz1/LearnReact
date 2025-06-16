import { useTranslation } from 'react-i18next';
import { Counter } from 'entities/Counter';
import { Box } from 'shared/ui/Box';
import { Text } from 'shared/ui/Text';

function MainPage() {
  const { t } = useTranslation('main');

  return (
    <Box className="page-wrapper" variant="section">
      <Text variant="h1">{t('title')}</Text>
      <Counter />
    </Box>
  );
}

export default MainPage;
