import {classNames} from "shared/lib/classNames/classNames";

import cls from "./LangSwitcher.module.scss";
import {useTranslation} from "react-i18next";
import {Button} from "shared/ui/Button";

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher = ({className}: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = async () => {
    try {
      await i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
    } catch (e) {
      console.log('i18n error', e);
    }
  }

  return (
    <Button
      onClick={toggleLanguage}
      className={classNames(
        cls.LangSwitcher,
        {},
        [className])}
    >
      {t('lang')}
    </Button>
  )
};
