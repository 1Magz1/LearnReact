import { ChangeEvent, HTMLAttributes, memo } from 'react';
import cls from './Input.module.scss';

interface InputProps extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number,
  onChange?: (value: string) => void,
  label?: string,
  placeholder?: string,
  type?: 'text' | 'number',
}

const Input = memo((props: InputProps) => {
  const {
    value, onChange, label, type, ...otherProps
  } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div>
      {label && <span className={cls.Label}>{label}</span>}
      <input
        type={type}
        className={cls.Input}
        value={value}
        onChange={handleChange}
        {...otherProps}
      />
    </div>
  );
});

export default Input;
