import { Button } from 'shared/ui/Button';
import { routePath } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import cls from './ArticleDetailsPageHeader.module.scss';

interface ArticleDetailsPageHeaderProps {
  edit?: boolean;
}

const ArticleDetailsPageHeader = (props: ArticleDetailsPageHeaderProps) => {
  const { edit } = props;

  const { t } = useTranslation('articleDetails');

  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate(routePath.articles);
  };

  const handleEdit = () => {
    navigate(`${routePath.articles}/${id}/edit`);
  };

  return (
    <div className={cls.header}>
      <Button onClick={handleBack}>
        {t('back')}
      </Button>
      {edit && (
        <Button onClick={handleEdit}>
          {t('edit')}
        </Button>
      )}
    </div>
  );
};

export default ArticleDetailsPageHeader;
