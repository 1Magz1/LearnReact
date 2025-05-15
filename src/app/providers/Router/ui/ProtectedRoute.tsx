import { useLocalStorage } from 'shared/hooks';
import { LOCAL_STORAGE_USERNAME_KEY } from 'shared/constants';
import { useNavigate } from 'react-router';
import { ReactNode, useEffect, useState } from 'react';
import { Loader } from 'widgets/Loader';

interface ProtectedRouteProps {
  children: ReactNode;
  authOnly?: boolean;
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { children, authOnly } = props;
  const [userName] = useLocalStorage(LOCAL_STORAGE_USERNAME_KEY, '');
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigate();

  useEffect(() => {
    if (!userName.length && authOnly) {
      navigation('/');
    }
    setIsLoading(false);
  }, [userName]);

  return isLoading ? <Loader size={40} /> : children;
};

export default ProtectedRoute;
