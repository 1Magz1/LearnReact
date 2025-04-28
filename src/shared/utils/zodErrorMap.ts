import { ZodErrorMap, ZodIssueCode } from 'zod';
import i18n from 'i18next';

export const zodErrorMap: ZodErrorMap = (issue, ctx) => {
  const { t } = i18n;

  let message: string;

  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      message = t('zod:errors.invalid_type', {
        expected: issue.expected,
        received: issue.received,
      });
      break;
    case ZodIssueCode.invalid_string:
      message = t('zod:errors.invalid_string');
      break;
    case ZodIssueCode.too_small:
      message = t('zod:errors.too_small', {
        minimum: issue.minimum,
      });
      if (issue.minimum === 1) {
        message = t('zod:errors.required_field');
      }
      if (issue.minimum === 18) {
        message = t('zod:errors.adult');
      }
      break;
    case ZodIssueCode.too_big:
      message = t('zod:errors.too_big', {
        maximum: issue.maximum,
      });
      break;
    default:
      message = ctx.defaultError;
  }

  return { message };
};
