import {
  KeyboardEventHandler,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { Controller, Control } from 'react-hook-form';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

interface Option {
  value: string;
  content: string;
}

interface CustomSelectProps {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  options: Option[];
  error?: string;
}

const CustomSelect = ({
  name,
  control,
  label,
  placeholder = '',
  options,
  error,
}: CustomSelectProps) => {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    // eslint-disable-next-line consistent-return
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selectedOption = options.find((opt) => opt.value === field.value);

        const handleSelect = (val: string) => {
          field.onChange(val);
        };

        const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
          switch (event.key) {
            case 'ArrowDown':
              event.preventDefault();
              setHighlightedIndex((prev) => (prev + 1) % options.length);
              break;
            case 'ArrowUp':
              event.preventDefault();
              setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
              break;
            case 'Enter':
              event.preventDefault();
              field.onChange(options[highlightedIndex].value);
              setIsOpen(false);
              break;
            default:
              setIsOpen(false);
              break;
          }
        };

        return (
          <div className={cls.wrapper}>
            {label && <label className={cls.label} htmlFor={`${id}-select`}>{label}</label>}
            <div
              ref={selectRef}
              role="combobox"
              tabIndex={0}
              aria-labelledby={`${id}-select`}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              aria-controls={`${id}-listbox`}
              className={cls.select}
              onClick={toggleOpen}
              onKeyDown={handleKeyDown}
            >
              <span className={cls.selected}>{selectedOption?.content || placeholder}</span>
              <span className={cls.arrow}>▾</span>
              {isOpen && (
                <ul
                  id={`${id}-listbox`}
                  role="listbox"
                  className={cls.dropdown}
                >
                  {options.map((opt, idx) => (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={idx === highlightedIndex}
                      className={classNames(cls.option, {
                        [cls.highlighted]: highlightedIndex === idx,
                        [cls['selected-option']]: field.value === opt.value,
                      })}
                      onClick={() => handleSelect(opt.value)}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                    >
                      {opt.content}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {error && <span className={cls.error}>{error}</span>}
          </div>
        );
      }}
    />
  );
};

export default CustomSelect;
