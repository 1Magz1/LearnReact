import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Box } from 'shared/ui/Box';
import { Text } from 'shared/ui/Text';
import cls from './NotFoundPage.module.scss';

function NotFoundPage() {
  const { t } = useTranslation('translation');
  return (
    <Box
      className={classNames(cls.page)}
      variant="section"
      alignItems="center"
      justifyContent="center"
    >
      <Text variant="h1">{t('notFound')}</Text>
    </Box>
  );
}

export default NotFoundPage;
