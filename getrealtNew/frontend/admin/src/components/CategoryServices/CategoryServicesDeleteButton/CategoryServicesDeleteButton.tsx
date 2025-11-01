'use client';

import Api from '@/app/api';
import AlertDelete from '@/components/ui/AlertDelete';
import { useRouter } from 'next/navigation';

interface IProps {
  id: number;
  title?: string;
  description?: string;
  triggerLabel?: string;
}

const CategoryServicesDeleteButton: React.FC<IProps> = ({ id, title = 'Удалить элемент', description = 'Вы уверены, что хотите удалить?', triggerLabel = 'Удалить' }) => {
  const router = useRouter();

  const handleDelete = async () => {
    await Api.FetchDeleteCategoryServices(id);
    router.refresh();
  };

  return <AlertDelete title={title} description={description} onConfirm={handleDelete} triggerLabel={triggerLabel} />;
};

export default CategoryServicesDeleteButton;
