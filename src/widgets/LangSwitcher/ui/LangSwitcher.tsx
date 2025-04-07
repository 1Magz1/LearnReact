import { classNames } from 'shared/lib/classNames/classNames';

import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button';
import { THEME_BUTTON } from 'shared/ui/Button/ui/Button';
import cls from './LangSwitcher.module.scss';

interface LangSwitcherProps {
  className?: string;
}

export function LangSwitcher({ className }: LangSwitcherProps) {
  const { t, i18n } = useTranslation();

  const toggleLanguage = async () => {
    try {
      await i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
    } catch (e) {
      console.log('i18n error', e);
    }
  };

  return (
    <Button
      data-testid="lang-switcher"
      onClick={toggleLanguage}
      theme={THEME_BUTTON.OUTLINE}
      className={classNames(
        cls.LangSwitcher,
        {},
        [className],
      )}
    >
      {t('lang')}
    </Button>
  );
}
