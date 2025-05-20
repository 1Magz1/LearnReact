import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import i18n from 'i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddCommentForm.module.scss';

const commentSchema = z.object({
  text: z.string().nonempty(),
});

export interface AddCommentFormState {
  text: string;
}

interface AddCommentFormProps {
  onSave: (data: AddCommentFormState) => void;
  className?: string;
}

const AddCommentForm = (props: AddCommentFormProps) => {
  const { className, onSave } = props;
  const { control, handleSubmit, trigger } = useForm<AddCommentFormState>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      text: '',
    },
  });

  // TODO: add hook
  useEffect(() => {
    const handleLanguageChange = () => {
      trigger();
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [trigger]);

  const onSubmit = (data: AddCommentFormState) => {
    onSave(data);
  };

  return (
    <form className={classNames(cls.form, {}, [className || ''])} onSubmit={handleSubmit(onSubmit)}>
      <Input name="text" control={control} />
      <Button type="submit" className={cls.btn}>
        Send
      </Button>
    </form>
  );
};

export default AddCommentForm;
