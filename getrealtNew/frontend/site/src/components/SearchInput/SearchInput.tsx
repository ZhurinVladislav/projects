'use client';

import IconSearch from '@/assets/icons/search.svg';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

// Расширяем тип для поддержки всех типов input
type InputType = React.HTMLInputTypeAttribute;

interface IProps {
  inputHandler: (value: string) => void;
  value: string;
  type?: InputType;
  placeholderText: string;
  errorText?: string;
  typeEl: 'desc' | 'phone';
}

const SearchInput: React.FC<IProps> = ({ value, inputHandler, type = 'text', placeholderText, errorText, typeEl }) => {
  const [isError, setIsError] = useState<boolean>(false);

  // Обновляем состояние isError при изменении errorText
  useEffect(() => {
    setIsError(!!errorText); // Устанавливаем isError=true, если errorText существует
  }, [errorText]);

  return (
    <div data-testid="search-input" className="relative w-full">
      <IconSearch className="absolute top-2/4 left-7 h-5 transform-[translateY(-50%)]" />
      <input data-testid="input-field" className={clsx('input', isError ? 'error' : '')} type={type} placeholder={placeholderText} value={value} onChange={ev => inputHandler(ev.target.value)} />
      {errorText && (
        <span data-testid="error-message" className="mt-1 block text-sm text-red-500">
          {errorText}
        </span>
      )}
      {typeEl === 'phone' ? (
        <button className="min-h-2 min-w-1">
          <IconSearch className="absolute top-2/4 left-7 h-5 transform-[translateY(-50%)]" />
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchInput;
