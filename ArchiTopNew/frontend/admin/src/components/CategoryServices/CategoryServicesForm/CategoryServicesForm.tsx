'use client';

import Api from '@/app/api';
import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import { TCategoryServices, TCategoryServicesRequest } from '@/types/CategoryServices/type';
import { TPageSimple } from '@/types/pages/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IProp {
  pages: TPageSimple[];
  obj?: TCategoryServices;
}

const CategoryServicesForm: React.FC<IProp> = ({ pages, obj }) => {
  const router = useRouter();
  const isEdit = !!obj;

  const [dropdownItems, setDropdownItems] = useState<{ label: string; value: string }[]>([]);
  const [pageId, setPageId] = useState<number | null>(obj?.pageId ?? null);
  const [title, setTitle] = useState(obj?.title ?? '');
  const [slug, setSlug] = useState(obj?.slug ?? '');
  const [description, setDescription] = useState(obj?.description ?? '');
  const [isAliasEdited, setIsAliasEdited] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  // Транслитерация alias
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

  // автоalias
  useEffect(() => {
    if (!isAliasEdited) {
      setSlug(transliterate(title));
    }
  }, [title]);

  const handleAliasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    setIsAliasEdited(true);
  };

  useEffect(() => {
    setDropdownItems(
      pages.map(item => ({
        label: item.pageTitle,
        value: item.id.toString(),
      })),
    );
  }, [pages]);

  // Отслеживание изменений
  useEffect(() => {
    if (!obj) return; // если создаем новую страницу

    const normalize = (value: string | null | undefined) => value?.trim() || '';

    const hasChanges = pageId !== (obj.pageId ?? null) || normalize(title) !== normalize(obj.title) || normalize(slug) !== normalize(obj.slug) || normalize(description) !== normalize(obj.description);

    setIsChanged(hasChanges);
  }, [pageId, title, slug, description, obj]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload: TCategoryServicesRequest = {
        pageId: Number(pageId) || null,
        title: title,
        slug: slug,
        description: description || null,
        is_active: true,
      };

      if (isEdit && obj?.id) {
        const res = await Api.fetchUpdateCategoryService(obj.id, payload);
        if (!res.status) throw new Error(res.message || 'Не удалось обновить категорию услуг');
      } else {
        const res = await Api.FetchStoreCategoryServices(payload);
        if (!res.status) throw new Error(res.message || 'Не удалось создать категорию услуг');
      }

      router.push('/dashboard/categories');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Ошибка при сохранении страницы');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4.5">
      {dropdownItems.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <p className="text-base">Родитель</p>
          <Dropdown label="Выберите родителя" items={dropdownItems} selectedValue={pageId ? pageId.toString() : undefined} onSelect={value => setPageId(parseInt(value))} className="w-75" />
        </div>
      )}

      <div className="flex flex-col gap-2.5">
        <label htmlFor="title" className="cursor-pointer text-base">
          Название категории<span className="text-(--error-color)">*</span>
        </label>
        <input id="title" className="w-full rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-2" type="text" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>

      <div className="flex flex-col gap-2.5">
        <label htmlFor="slug" className="cursor-pointer text-base">
          Адрес страницы<span className="text-(--error-color)">*</span>
        </label>
        <input id="slug" className="w-full rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-2" type="text" value={slug} onChange={handleAliasChange} required />
      </div>

      <div className="flex flex-col gap-2.5">
        <label htmlFor="description" className="cursor-pointer text-base">
          Описание
        </label>
        <textarea id="description" className="w-full rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-2" value={description} onChange={e => setDescription(e.target.value)} />
      </div>

      {error && <p className="text-sm text-(--error-color)">{error}</p>}

      {/* 🔘 Кнопка сохранения */}
      <AnimatePresence>
        {(!isEdit || isChanged) && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.25 }}>
            <Button className="mt-8 w-full" type="submit" variant="success" disabled={loading}>
              {loading ? 'Сохранение...' : isEdit ? 'Сохранить изменения' : 'Создать категорию'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default CategoryServicesForm;
