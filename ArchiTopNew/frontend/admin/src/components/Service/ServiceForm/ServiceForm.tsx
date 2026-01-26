'use client';

import Api from '@/app/api';
import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import { TStoreCategoryServices } from '@/types/CategoryServices/type';
import { TService } from '@/types/Service/type';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IProp {
  dataCategory: TStoreCategoryServices[];
  obj?: TService;
}

const ServiceForm: React.FC<IProp> = ({ dataCategory, obj }) => {
  const router = useRouter();
  const isEdit = !!obj;

  const [title, setTitle] = useState(obj?.title ?? '');
  const [categories, setCategories] = useState<TStoreCategoryServices[]>(obj?.categories ?? []);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  // 📌 Для выпадающего списка
  const dropdownItems = dataCategory.map(cat => ({
    label: cat.title,
    value: cat.id.toString(),
  }));

  // ✅ Добавление категории (если не выбрана ранее)
  const handleAddCategory = (value: string) => {
    const selected = dataCategory.find(c => c.id === parseInt(value));
    if (!selected) return;
    if (categories.some(c => c.id === selected.id)) return; // не добавляем дубликаты
    setCategories(prev => [...prev, selected]);
    setIsChanged(true);
  };

  // ❌ Удаление категории
  const handleRemoveCategory = (id: number) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    setIsChanged(true);
  };

  // 🔍 Проверка изменений
  useEffect(() => {
    if (!obj) return;

    const normalize = (v: string | null | undefined) => v?.trim() || '';
    const titleChanged = normalize(title) !== normalize(obj.title);
    const categoriesChanged = JSON.stringify(categories.map(c => c.id).sort()) !== JSON.stringify((obj.categories ?? []).map(c => c.id).sort());

    setIsChanged(titleChanged || categoriesChanged);
  }, [title, categories, obj]);

  // 💾 Сохранение
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        title: title,
        is_active: true,
        category_ids: categories.map(c => c.id),
      };

      if (isEdit && obj?.id) {
        const res = await Api.fetchUpdateService(obj.id, payload);
        if (!res.status) throw new Error(res.message || 'Не удалось обновить услугу');
      } else {
        const res = await Api.fetchStoreService(payload);
        if (!res.status) throw new Error(res.message || 'Не удалось создать услугу');
      }

      router.push('/dashboard/services');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Ошибка при сохранении');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4.5">
      <div className="flex flex-col gap-2.5">
        <label htmlFor="title" className="cursor-pointer text-base">
          Название услуги<span className="text-(--error-color)">*</span>
        </label>
        <input id="title" className="w-full rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-2" type="text" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>

      {/* 🧩 Выбор категорий */}
      <div className="flex flex-col gap-2.5">
        <p className="text-base">Категории</p>
        <Dropdown label="Добавить категорию" items={dropdownItems} onSelect={handleAddCategory} className="w-75" />

        {/* 🏷️ Список выбранных */}
        <div className="mt-2 flex flex-wrap gap-2">
          {categories.length > 0 ? (
            categories.map(cat => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 rounded-full border border-(--secondary-color) bg-(--bg-op-1-color) px-3 py-1 text-sm"
              >
                <button className="flex items-center justify-center gap-1 transition-opacity duration-300 ease-linear hover:opacity-70" type="button" onClick={() => handleRemoveCategory(cat.id)}>
                  <span>{cat.title}</span>

                  <X size={14} className="text-(--error-color) hover:text-red-600" />
                </button>
              </motion.div>
            ))
          ) : (
            <span className="text-sm text-(--secondary-color)">Категории не выбраны</span>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-(--error-color)">{error}</p>}

      {/* 💾 Кнопка сохранения */}
      <AnimatePresence>
        {(!isEdit || isChanged) && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.25 }}>
            <Button className="mt-8 w-full" type="submit" variant="success" disabled={loading}>
              {loading ? 'Сохранение...' : isEdit ? 'Сохранить изменения' : 'Создать услугу'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default ServiceForm;
