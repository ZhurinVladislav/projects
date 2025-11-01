'use client';

import Api from '@/app/api';
import { TPage, TPageSimple } from '@/types/pages/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import HtmlEditor from '../HtmlEditor';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown/Dropdown';

interface IProp {
  pages: TPageSimple[];
  pageObj?: TPage;
}

const ResourcesForm: React.FC<IProp> = ({ pages, pageObj }) => {
  const router = useRouter();
  const isEdit = !!pageObj;

  const [dropdownItems, setDropdownItems] = useState<{ label: string; value: string }[]>([]);
  const [parentId, setParentId] = useState<number | null>(pageObj?.parentId ?? null);
  const [pageTitle, setPageTitle] = useState(pageObj?.pageTitle ?? '');
  const [alias, setAlias] = useState(pageObj?.alias ?? '');
  const [isAliasEdited, setIsAliasEdited] = useState(isEdit && !!pageObj?.alias);
  const [longTitle, setLongTitle] = useState(pageObj?.longTitle ?? '');
  const [description, setDescription] = useState(pageObj?.description ?? '');
  const [keywords, setKeywords] = useState(pageObj?.keywords ?? '');
  const [html, setHtml] = useState(pageObj?.content ?? '<p>Начальный текст</p>');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  // 🔠 Транслитерация alias
  const transliterate = (text: string) => {
    const map: Record<string, string> = {
      а: 'a',
      б: 'b',
      в: 'v',
      г: 'g',
      д: 'd',
      е: 'e',
      ё: 'e',
      ж: 'zh',
      з: 'z',
      и: 'i',
      й: 'y',
      к: 'k',
      л: 'l',
      м: 'm',
      н: 'n',
      о: 'o',
      п: 'p',
      р: 'r',
      с: 's',
      т: 't',
      у: 'u',
      ф: 'f',
      х: 'h',
      ц: 'ts',
      ч: 'ch',
      ш: 'sh',
      щ: 'sch',
      ъ: '',
      ы: 'y',
      ь: '',
      э: 'e',
      ю: 'yu',
      я: 'ya',
    };
    return text
      .toLowerCase()
      .split('')
      .map(char => map[char] || char)
      .join('')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  // 🔄 автоalias только при создании страницы
  useEffect(() => {
    if (!isEdit && !isAliasEdited) {
      setAlias(transliterate(pageTitle));
    }
  }, [pageTitle, isEdit, isAliasEdited]);

  const handleAliasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlias(e.target.value);
    setIsAliasEdited(true);
  };

  // 📂 Подготовка списка родителей
  useEffect(() => {
    const items = pages.map(item => ({
      label: item.pageTitle,
      value: item.id.toString(),
    }));

    // Добавляем пункт “Без родителя”
    setDropdownItems([{ label: '— Без родителя —', value: '' }, ...items]);
  }, [pages]);

  // 🔍 Отслеживание изменений
  useEffect(() => {
    if (!pageObj) return; // если создаем новую страницу

    const normalize = (value: string | null | undefined) => value?.trim() || '';

    const hasChanges =
      parentId !== (pageObj.parentId ?? null) ||
      normalize(pageTitle) !== normalize(pageObj.pageTitle) ||
      normalize(alias) !== normalize(pageObj.alias) ||
      normalize(longTitle) !== normalize(pageObj.longTitle) ||
      normalize(description) !== normalize(pageObj.description) ||
      normalize(keywords) !== normalize(pageObj.keywords) ||
      normalize(html) !== normalize(pageObj.content);

    setIsChanged(hasChanges);
  }, [parentId, pageTitle, alias, longTitle, description, keywords, html, pageObj]);

  // 🚀 Отправка формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        parent_id: parentId || null,
        page_title: pageTitle,
        alias: alias,
        long_title: longTitle || null,
        description: description || null,
        keywords: keywords || null,
        content: html || null,
        is_published: true,
      };

      if (isEdit && pageObj?.id) {
        const res = await Api.fetchUpdatePage(pageObj.id, payload);
        if (!res.status) throw new Error(res.message || 'Не удалось обновить страницу');
      } else {
        const res = await Api.fetchPostPage(payload);
        if (!res.status) throw new Error(res.message || 'Не удалось создать страницу');
      }

      router.push('/dashboard/resources');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Ошибка при сохранении страницы');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4.5">
      {/* Родительская страница */}
      <div className="flex flex-col gap-2.5">
        <p className="text-base">Родитель</p>
        <Dropdown
          label="Выберите родителя"
          items={dropdownItems}
          selectedValue={parentId ? parentId.toString() : ''}
          onSelect={value => setParentId(value ? parseInt(value) : null)}
          className="w-75"
        />
      </div>

      {/* Название */}
      <div className="flex flex-col gap-2.5">
        <label htmlFor="pageTitle" className="cursor-pointer text-base">
          Название страницы<span className="text-(--error-color)">*</span>
        </label>
        <input
          id="pageTitle"
          className="w-full rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-2"
          type="text"
          value={pageTitle}
          onChange={e => setPageTitle(e.target.value)}
          required
        />
      </div>

      {/* alias */}
      <div className="flex flex-col gap-2.5">
        <label htmlFor="alias" className="cursor-pointer text-base">
          Адрес страницы<span className="text-(--error-color)">*</span>
        </label>
        <input id="alias" className="w-full rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-2" type="text" value={alias} onChange={handleAliasChange} required />
      </div>

      {/* SEO блоки */}
      <div className="flex flex-col gap-2.5">
        <label htmlFor="longTitle" className="cursor-pointer text-base">
          Расширенный заголовок <span className="text-(--secondary-color)">(SEO)</span>
        </label>
        <input id="longTitle" className="w-full rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-2" type="text" value={longTitle} onChange={e => setLongTitle(e.target.value)} />
      </div>

      <div className="flex flex-col gap-2.5">
        <label htmlFor="description" className="cursor-pointer text-base">
          Описание страницы <span className="text-(--secondary-color)">(SEO)</span>
        </label>
        <textarea
          id="description"
          className="h-52 w-full resize-none rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="keywords" className="mb-2.5 cursor-pointer text-base">
          Ключевые слова <span className="text-(--secondary-color)">(SEO)</span>
        </label>
        <input id="keywords" className="mb-1 w-full rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-2" type="text" value={keywords} onChange={e => setKeywords(e.target.value)} />
        <span className="text-base text-(--info-color)">Пояснение: через запятую</span>
      </div>

      <HtmlEditor value={html} onChange={setHtml} />

      {error && <p className="text-sm text-(--error-color)">{error}</p>}

      <AnimatePresence>
        {(!isEdit || isChanged) && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.25 }}>
            <Button className="mt-8 w-full" type="submit" variant="success" disabled={loading}>
              {loading ? 'Сохранение...' : isEdit ? 'Сохранить изменения' : 'Создать страницу'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default ResourcesForm;
