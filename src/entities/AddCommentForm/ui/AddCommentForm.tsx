import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import i18n from 'i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
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
  isLoading: boolean;
}

const AddCommentForm = (props: AddCommentFormProps) => {
  const { className, onSave, isLoading } = props;
  const { t } = useTranslation();
  const {
    control, handleSubmit, trigger, reset,
  } = useForm<AddCommentFormState>({
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
    reset();
  };

  return (
    <form className={classNames(cls.form, {}, [className || ''])} onSubmit={handleSubmit(onSubmit)}>
      <Input name="text" control={control} />
      <Button
        type="submit"
        className={cls.btn}
        isLoading={isLoading}
        disabled={isLoading}
      >
        {t('send')}
      </Button>
    </form>
  );
};

export default AddCommentForm;
