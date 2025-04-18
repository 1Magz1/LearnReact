import LoadingIcon from 'shared/assets/icons/loading.svg';
import cls from './Loader.module.scss';

interface LoaderProps {
  size?: number
}

const Loader = (props: LoaderProps) => {
  const { size = 20 } = props;

  return (
    <div className={cls.loader}>
      <div className={cls.wrap}>
        <LoadingIcon width={size} height={size} />
      </div>
    </div>
  );
};

export default Loader;
