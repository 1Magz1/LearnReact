import { useEffect } from 'react';
import { FieldValues, useForm, UseFormProps } from 'react-hook-form';
import i18n from 'i18next';
import { zodErrorMap } from 'shared/utils/zodErrorMap';
import { z, ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type ZodI18nFormOptions<TFormValues extends FieldValues, TContext> =
  Omit<UseFormProps<TFormValues, TContext>, 'resolver'> & {
  schema: ZodSchema<TFormValues>;
};

export function useZodI18nForm<
  TFormValues extends FieldValues = FieldValues,
  TContext = unknown
>(options: ZodI18nFormOptions<TFormValues, TContext>) {
  const { schema, ...formOptions } = options;

  const formMethods = useForm({
    ...formOptions,
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const handleLanguageChange = () => {
      z.setErrorMap(zodErrorMap);
      formMethods.trigger();
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [formMethods.trigger]);

  return formMethods;
}
