import { Controller, Control } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';
import cls from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  name: string;
  control: Control<any>;
}

const Input = (props: InputProps) => {
  const {
    label,
    error,
    control,
    name,
    required,
    ...rest
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={cls['input-wrap']}>
          {label && <label className={cls.label} htmlFor={name}>{`${label}${required ? '*' : ''}`}</label>}
          <input
            {...rest}
            {...field}
            ref={field.ref}
            id={name}
            className={cls.input}
          />
          {error && <span className={cls.error}>{error}</span>}
        </div>
      )}
    />
  );
};

export default Input;
