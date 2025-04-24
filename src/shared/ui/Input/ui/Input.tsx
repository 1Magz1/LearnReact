import { Controller, Control } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';
import cls from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  name: string;
  control: Control<any>;
}

const Input = (props: InputProps) => {
  const {
    label,
    error,
    control,
    name,
    ...rest
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={cls['input-wrap']}>
          {label && <span className={cls.label}>{label}</span>}
          <input
            {...rest}
            {...field}
            ref={field.ref}
            className={cls.input}
          />
          {error && <span className={cls.error}>{error}</span>}
        </div>
      )}
    />
  );
};

export default Input;
