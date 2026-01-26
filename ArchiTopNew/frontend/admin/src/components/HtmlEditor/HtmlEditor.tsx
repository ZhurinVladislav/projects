'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';

// Импортируем react-quill-new
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface HtmlEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  description?: string;
}

const HtmlEditor: React.FC<HtmlEditorProps> = ({
  value = '',
  onChange,
  label = 'Контент страницы',
  description = 'Введите текст с форматированием. Можно использовать заголовки, списки, ссылки и изображения.',
}) => {
  const [content, setContent] = useState(value);

  const handleChange = (html: string) => {
    setContent(html);
    onChange?.(html);
  };

  return (
    <div className="flex w-full flex-col gap-2.5">
      {/* Заголовок и описание */}
      <div className="mb-2 flex flex-col gap-3">
        <label className="cursor-pointer">{label}</label>
        <p className="text-base">{description}</p>
      </div>

      {/* Обёртка редактора */}
      <ReactQuill
        value={content}
        onChange={handleChange}
        theme="snow"
        placeholder="Введите текст..."
        modules={{
          toolbar: [[{ header: [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike'], [{ list: 'ordered' }, { list: 'bullet' }], ['blockquote', 'code-block'], ['link', 'image'], ['clean']],
        }}
        className="min-h-[300px] w-full border-0 text-white"
      />
    </div>
  );
};

export default HtmlEditor;
