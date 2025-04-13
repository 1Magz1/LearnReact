import { Input } from 'shared/ui/Input';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  userName: string;
  password: string;
  onUserNameChange: (username: string) => void;
  onPasswordChange: (username: string) => void;
}

const LoginForm = (props: LoginFormProps) => {
  const {
    userName, password, onUserNameChange, onPasswordChange,
  } = props;

  const { t } = useTranslation();

  const handleUserNameChange = (username: string) => {
    onUserNameChange(username);
  };

  const handlePasswordChange = (password: string) => {
    onPasswordChange(password);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Input label={t('labels.login')} value={userName} onChange={handleUserNameChange} />
      <Input label={t('labels.password')} value={password} onChange={handlePasswordChange} />
    </div>
  );
};

export default LoginForm;
