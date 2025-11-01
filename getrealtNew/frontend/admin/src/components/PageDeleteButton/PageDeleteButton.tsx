'use client';

import Api from '@/app/api';
import { useRouter } from 'next/navigation';
import AlertDelete from '../ui/AlertDelete';

interface IProps {
  id: number;
  title?: string;
  description?: string;
  triggerLabel?: string;
}

const PageDeleteButton: React.FC<IProps> = ({ id, title = 'Удалить элемент', description = 'Вы уверены, что хотите удалить?', triggerLabel = 'Удалить' }) => {
  const router = useRouter();

  const handleDelete = async () => {
    await Api.fetchDeletePage(id);
    router.refresh();
  };

  return <AlertDelete title={title} description={description} onConfirm={handleDelete} triggerLabel={triggerLabel} />;
};

export default PageDeleteButton;
