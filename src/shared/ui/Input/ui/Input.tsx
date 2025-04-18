import { ChangeEvent, HTMLAttributes, memo } from 'react';
import cls from './Input.module.scss';

interface InputProps extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange?: (value: string) => void;
  label?: string;
}

const Input = memo((props: InputProps) => {
  const {
    value, onChange, label, ...otherProps
  } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div>
      {label && <span className={cls.Label}>{label}</span>}
      <input
        className={cls.Input}
        value={value}
        onChange={handleChange}
        {...otherProps}
      />
    </div>
  );
});

export default Input;
