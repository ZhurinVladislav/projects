'use client';

import { useState } from 'react';
import SearchInput from '../SearchInput';

interface IProps {
  typeEl?: 'desc' | 'phone';
}

const SearchForm: React.FC<IProps> = props => {
  const { typeEl = 'desc' } = props;

  const [value, setValue] = useState<string>('');

  const inputValue = (ev: string) => {
    setValue(ev);
  };

  return (
    <form className="max-h-max w-full max-w-150.5">
      <SearchInput typeEl={typeEl} inputHandler={inputValue} placeholderText="Поиск по услуге" value={value} />
    </form>
  );
};

export default SearchForm;
