// 'use client';

// import Api from '@/app/api';
// import Button from '@/components/ui/Button';
// import Checkbox from '@/components/ui/Checkbox';
// import Dropdown from '@/components/ui/Dropdown/Dropdown';
// import { TCompany, TCompanyService, TFetchCompany } from '@/types';
// import { TStoreCategoryServices } from '@/types/CategoryServices/type';
// import { TPageSimple } from '@/types/pages/types';
// import { TService } from '@/types/Service/type';
// import { AnimatePresence, motion } from 'framer-motion';
// import { X } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// interface IProp {
//   dataPages: TPageSimple[];
//   dataCategories: TStoreCategoryServices[];
//   dataServices: TService[];
//   obj?: TCompany;
// }

// const CompanyForm: React.FC<IProp> = ({ dataPages, dataCategories, dataServices, obj }) => {
//   const router = useRouter();
//   const isEdit = !!obj;

//   // Основные поля
//   const [pageId, setPageId] = useState<string | number | null>(obj?.pageId ?? null);
//   const [title, setTitle] = useState(obj?.title ?? '');
//   const [introText, setIntroText] = useState(obj?.introText ?? '');
//   const [imgAlt, setImgAlt] = useState(obj?.imageAlt ?? '');
//   const [phone, setPhone] = useState(obj?.phone ?? '');
//   const [email, setEmail] = useState(obj?.email ?? '');
//   const [siteUrl, setSiteUrl] = useState(obj?.siteUrl ?? '');
//   const [experience, setExperience] = useState(obj?.experience ?? '');
//   const [address, setAddress] = useState(obj?.address ?? '');
//   const [mapLink, setMapLink] = useState(obj?.mapLink ?? '');
//   const [promo, setPromo] = useState(obj?.promo ?? false);

//   // Категории и услуги
//   const [categories, setCategories] = useState<TStoreCategoryServices[]>(obj?.serviceCategories ?? []);
//   const [services, setServices] = useState<TCompanyService[]>(obj?.services ?? []);

//   // Загрузка изображений
//   const [mainImage, setMainImage] = useState<File | null>(null);
//   const [removeImage, setRemoveImage] = useState(false);
//   const [mainPreview, setMainPreview] = useState<string>(obj?.image ?? '');
//   const [gallery, setGallery] = useState<File[]>([]);
//   // const [galleryPreview, setGalleryPreview] = useState<string[]>(obj?.gallery ?? []);

//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isChanged, setIsChanged] = useState(false);

//   // Dropdown страницы
//   const [dropdownItems, setDropdownItems] = useState<{ label: string; value: string }[]>([]);
//   useEffect(() => {
//     setDropdownItems(
//       dataPages.map(item => ({
//         label: item.pageTitle,
//         value: item.id.toString(),
//       })),
//     );
//   }, [dataPages]);

//   // Добавление/удаление категорий
//   const categoryDropdown = dataCategories.map(cat => ({ label: cat.title, value: cat.id.toString() }));
//   const handleAddCategory = (value: string) => {
//     const selected = dataCategories.find(c => c.id === parseInt(value));
//     if (!selected || categories.some(c => c.id === selected.id)) return;
//     setCategories(prev => [...prev, selected]);
//   };
//   const handleRemoveCategory = (id: number) => {
//     setCategories(prev => prev.filter(c => c.id !== id));
//     setServices(prev => prev.filter(s => !s.category_ids.includes(id))); // удаляем услуги категории
//   };

//   // Добавление услуги
//   const handleAddService = (value: string) => {
//     const selected = dataServices.find(s => s.id === parseInt(value));
//     if (!selected || services.some(s => s.id === selected.id)) return;

//     // Добавляем категории этой услуги, если их нет
//     const missingCategories = selected.category_ids.map(cid => dataCategories.find(c => c.id === cid)).filter(Boolean) as TStoreCategoryServices[];

//     setCategories(prev => {
//       const newCats = [...prev];
//       missingCategories.forEach(cat => {
//         if (!newCats.some(c => c.id === cat.id)) newCats.push(cat);
//       });
//       return newCats;
//     });

//     setServices(prev => [...prev, selected]);
//   };

//   const handleRemoveService = (id: number) => {
//     setServices(prev => prev.filter(s => s.id !== id));
//   };

//   const toggleService = (serviceId: number, checked: boolean) => {
//     if (checked) {
//       const s = dataServices.find(s => s.id === serviceId);
//       if (!s) return;
//       handleAddService(serviceId.toString());
//     } else {
//       handleRemoveService(serviceId);
//     }
//   };

//   // Формируем items для Dropdown с исключением уже выбранных категорий
//   const availableCategoriesDropdown = dataCategories.filter(cat => !categories.some(selected => selected.id === cat.id)).map(cat => ({ label: cat.title, value: cat.id.toString() }));

//   const isServiceChecked = (id: number) => services.some(s => s.id === id);

//   // // Добавление/удаление категорий
//   // const categoryDropdown = dataCategories.map(cat => ({ label: cat.title, value: cat.id.toString() }));
//   // const handleAddCategory = (value: string) => {
//   //   const selected = dataCategories.find(c => c.id === parseInt(value));
//   //   if (!selected || categories.some(c => c.id === selected.id)) return;
//   //   setCategories(prev => [...prev, selected]);
//   //   setIsChanged(true);
//   // };
//   // const handleRemoveCategory = (id: number) => {
//   //   setCategories(prev => prev.filter(c => c.id !== id));
//   //   setIsChanged(true);
//   // };

//   // // Добавление/удаление услуг
//   // const servicesDropdown = dataServices.map(s => ({ label: s.title, value: s.id.toString() }));
//   // const handleAddService = (value: string) => {
//   //   const selected = dataServices.find(s => s.id === parseInt(value));
//   //   if (!selected || services.some(s => s.id === selected.id)) return;
//   //   setServices(prev => [...prev, selected]);
//   //   setIsChanged(true);
//   // };
//   // const handleRemoveService = (id: number) => {
//   //   setServices(prev => prev.filter(s => s.id !== id));
//   //   setIsChanged(true);
//   // };

//   // Загрузка основного изображения
//   const handleMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setMainImage(file);
//     setMainPreview(URL.createObjectURL(file));
//     setIsChanged(true);
//   };

//   // Загрузка галереи
//   const handleGallery = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;
//     const newFiles = Array.from(files);
//     setGallery(prev => [...prev, ...newFiles]);
//     // setGalleryPreview(prev => [...prev, ...newFiles.map(f => URL.createObjectURL(f))]);
//     setIsChanged(true);
//   };

//   const handleRemoveGalleryItem = (index: number) => {
//     setGallery(prev => prev.filter((_, i) => i !== index));
//     // setGalleryPreview(prev => prev.filter((_, i) => i !== index));
//     setIsChanged(true);
//   };

//   // Проверка изменений
//   useEffect(() => {
//     if (!obj) return;
//     const normalize = (v: string | null | undefined) => v?.trim() || '';
//     const fieldsChanged =
//       normalize(title) !== normalize(obj.title) ||
//       normalize(introText) !== normalize(obj.introText) ||
//       normalize(imgAlt) !== normalize(obj.imageAlt) ||
//       normalize(phone) !== normalize(obj.phone) ||
//       normalize(email) !== normalize(obj.email) ||
//       normalize(siteUrl) !== normalize(obj.siteUrl) ||
//       normalize(experience) !== normalize(obj.experience) ||
//       normalize(address) !== normalize(obj.address) ||
//       normalize(mapLink) !== normalize(obj.mapLink) ||
//       pageId !== (obj.pageId ?? null) ||
//       categories
//         .map(c => c.id)
//         .sort()
//         .toString() !==
//         (obj.serviceCategories ?? [])
//           .map(c => c.id)
//           .sort()
//           .toString() ||
//       services
//         .map(s => s.id)
//         .sort()
//         .toString() !==
//         (obj.services ?? [])
//           .map(s => s.id)
//           .sort()
//           .toString() ||
//       mainImage !== null ||
//       gallery.length > 0;
//     setIsChanged(fieldsChanged);
//   }, [pageId, title, introText, imgAlt, phone, siteUrl, experience, address, mapLink, promo, categories, services, mainImage, gallery, obj]);

//   // Сохранение
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       let payload: TFetchCompany = {
//         page_id: pageId,
//         title: title,
//         introtext: introText,
//         image: mainImage,
//         image_alt: imgAlt,
//         phone: phone,
//         email: email,
//         site_url: siteUrl,
//         experience: experience,
//         address: address,
//         map_link: mapLink,
//         promo: promo,
//         service_category_ids: categories.map(c => c.id),
//         service_ids: services.map(s => s.id),
//       };

//       if (isEdit && obj?.id) {
//         const res = await Api.fetchUpdateCompany(obj.id, payload, removeImage);
//         if (!res.status) throw new Error(res.message || 'Не удалось обновить компанию');
//       } else {
//         const res = await Api.fetchStoreCompany(payload);
//         if (!res.status) throw new Error(res.message || 'Не удалось создать компанию');
//       }

//       router.push('/dashboard/companies');
//     } catch (err) {
//       console.error(err);
//       setError(err instanceof Error ? err.message : 'Ошибка при сохранении');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4.5">
//       {/* Выбор страницы */}
//       <div className="flex flex-col gap-2.5">
//         <p className="text-base">Страница</p>
//         <Dropdown
//           label="Выберите страницу"
//           items={dropdownItems}
//           selectedValue={pageId?.toString()}
//           onSelect={value => {
//             setPageId(value);
//             setIsChanged(true);
//           }}
//           className="w-75"
//         />
//       </div>

//       {/* Название */}
//       <div className="flex flex-col gap-2.5">
//         <label htmlFor="title" className="cursor-pointer text-base">
//           Название компании <span className="text-(--error-color)">*</span>
//         </label>
//         <input id="title" className="w-full rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-2" type="text" value={title} onChange={e => setTitle(e.target.value)} required />
//       </div>

//       {/* Краткое описание */}
//       <div className="flex flex-col gap-2.5">
//         <label htmlFor="introText" className="cursor-pointer text-base">
//           Краткое описание
//         </label>
//         <textarea
//           id="introText"
//           className="h-52 w-full resize-none rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-2"
//           value={introText}
//           onChange={e => setIntroText(e.target.value)}
//         />
//       </div>

//       {/* Основное изображение */}
//       <div className="flex flex-col gap-2.5">
//         <p className="text-base">Основное изображение</p>

//         {/* Preview */}
//         {mainPreview && (
//           <div className="relative h-40 w-40 overflow-hidden rounded border border-dashed border-(--secondary-color)">
//             <img src={mainPreview} alt="Превью" className="h-full w-full object-cover" />
//             <button
//               type="button"
//               onClick={() => {
//                 setMainImage(null);
//                 setMainPreview('');
//                 setRemoveImage(true);
//                 setIsChanged(true);
//               }}
//               className="absolute top-1 right-1 rounded-full bg-(--error-color) p-1"
//             >
//               <X size={16} />
//             </button>
//           </div>
//         )}

//         {/* Инпут */}
//         <label className="relative flex h-40 w-40 cursor-pointer items-center justify-center rounded border-2 border-dashed border-(--secondary-color) bg-(--bg-op-1-color) transition hover:border-(--accent-color)">
//           <span className="text-center text-sm text-(--secondary-color)">{mainPreview ? 'Изменить изображение' : 'Выберите изображение'}</span>
//           <input type="file" accept="image/*" onChange={handleMainImage} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
//         </label>
//       </div>

//       {/* Описание изображения */}
//       <div className="flex flex-col gap-2.5">
//         <label htmlFor="imgAlt" className="cursor-pointer text-base">
//           Описание изображения <span className="text-(--secondary-color)">(SEO)</span>
//         </label>
//         <input id="imgAlt" className="w-full rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-2" type="text" value={imgAlt} onChange={e => setImgAlt(e.target.value)} />
//       </div>

//       {/* Номер телефона */}
//       <div className="flex flex-col gap-2.5">
//         <label htmlFor="phone" className="cursor-pointer text-base">
//           Номер телефона
//         </label>
//         <input id="phone" className="w-full rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-2" type="text" value={phone} onChange={e => setPhone(e.target.value)} />
//       </div>

//       {/* E-mail */}
//       <div className="flex flex-col gap-2.5">
//         <label htmlFor="email" className="cursor-pointer text-base">
//           E-mail
//         </label>
//         <input id="email" className="w-full rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-2" type="email" value={email} onChange={e => setEmail(e.target.value)} />
//       </div>

//       {/* Ссылка на сайт */}
//       <div className="flex flex-col gap-2.5">
//         <label htmlFor="siteUrl" className="cursor-pointer text-base">
//           Ссылка на сайт
//         </label>
//         <input id="siteUrl" className="w-full rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-2" type="text" value={siteUrl} onChange={e => setSiteUrl(e.target.value)} />
//       </div>

//       {/* Опыт работы */}
//       <div className="flex flex-col gap-2.5">
//         <label htmlFor="experience" className="cursor-pointer text-base">
//           Опыт работы
//         </label>
//         <input id="experience" className="w-full rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-2" type="text" value={experience} onChange={e => setExperience(e.target.value)} />
//       </div>

//       {/* Адрес компании */}
//       <div className="flex flex-col gap-2.5">
//         <label htmlFor="address" className="cursor-pointer text-base">
//           Адрес компании
//         </label>
//         <input id="address" className="w-full rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-2" type="text" value={address} onChange={e => setAddress(e.target.value)} />
//       </div>

//       {/* Ссылка на карты */}
//       <div className="flex flex-col gap-2.5">
//         <label htmlFor="mapLink" className="cursor-pointer text-base">
//           Ссылка на карты <span className="text-(--secondary-color)">(например, Яндекс.Карты)</span>
//         </label>
//         <input id="mapLink" className="w-full rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-2" type="text" value={mapLink} onChange={e => setMapLink(e.target.value)} />
//       </div>

//       {/* Промо */}
//       <div className="flex items-center gap-2">
//         <Checkbox id="promo" label="Активировать промо" checked={promo} onChange={e => setPromo(e.target.checked)} />
//       </div>

//       {/* Категории с услугами */}
//       <div className="flex flex-col gap-4">
//         <label className="text-lg font-semibold">Категории и услуги</label>

//         {availableCategoriesDropdown.length > 0 && <Dropdown label="Добавить категорию" items={availableCategoriesDropdown} onSelect={handleAddCategory} className="w-75" />}

//         <div className="mt-3 flex flex-col gap-3">
//           {categories.map(cat => {
//             const catServices = dataServices.filter(s => s.category_ids.includes(cat.id));
//             return (
//               <motion.div
//                 key={cat.id}
//                 initial={{ opacity: 0, y: -5 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -5 }}
//                 className="rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-4 shadow-sm"
//               >
//                 <div className="mb-3 flex items-center justify-between">
//                   <span className="font-medium">{cat.title}</span>
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveCategory(cat.id)}
//                     className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600 transition hover:bg-red-200 hover:text-red-700"
//                   >
//                     <X size={14} />
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-3">
//                   {catServices.map(s => (
//                     <Checkbox key={s.id} id={`service-${s.id}`} label={s.title} checked={isServiceChecked(s.id)} onChange={e => toggleService(s.id, e.target.checked)} />
//                   ))}
//                   {/* {catServices.map(s => (
//                     <label key={s.id} htmlFor={`service-${s.id}`} className="flex cursor-pointer items-center gap-2 rounded p-2 transition hover:bg-gray-50">
//                       <input
//                         type="checkbox"
//                         id={`service-${s.id}`}
//                         checked={isServiceChecked(s.id)}
//                         onChange={e => toggleService(s.id, e.target.checked)}
//                         className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                       />
//                       <span>{s.title}</span>
//                     </label>
//                   ))} */}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Категории услуг */}
//       {/* <div className="flex flex-col gap-2.5">
//         <label className="cursor-pointer text-base">Категории услуг</label>
//         <Dropdown label="Добавить категорию" items={categoryDropdown} onSelect={handleAddCategory} className="w-75" />
//         <div className="mt-2 flex flex-wrap gap-2">
//           {categories.length > 0 ? (
//             categories.map(cat => (
//               <motion.div
//                 key={cat.id}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 className="flex items-center gap-2 rounded-full border border-(--secondary-color) bg-(--bg-op-1-color) px-3 py-1 text-sm"
//               >
//                 <button type="button" className="flex items-center gap-1" onClick={() => handleRemoveCategory(cat.id)}>
//                   <span>{cat.title}</span>
//                   <X size={14} className="text-(--error-color) hover:text-red-600" />
//                 </button>
//               </motion.div>
//             ))
//           ) : (
//             <span className="text-sm text-(--secondary-color)">Категории не выбраны</span>
//           )}
//         </div>
//       </div> */}

//       {/* Услуги */}
//       {/* <div className="flex flex-col gap-2.5">
//         <label className="cursor-pointer text-base">Услуги</label>
//         <Dropdown label="Добавить услугу" items={servicesDropdown} onSelect={handleAddService} className="w-75" />
//         <div className="mt-2 flex flex-wrap gap-2">
//           {services.length > 0 ? (
//             services.map(s => (
//               <motion.div
//                 key={s.id}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 className="flex items-center gap-2 rounded-full border border-(--secondary-color) bg-(--bg-op-1-color) px-3 py-1 text-sm"
//               >
//                 <button type="button" className="flex items-center gap-1" onClick={() => handleRemoveService(s.id)}>
//                   <span>{s.title}</span>
//                   <X size={14} className="text-(--error-color) hover:text-red-600" />
//                 </button>
//               </motion.div>
//             ))
//           ) : (
//             <span className="text-sm text-(--secondary-color)">Услуги не выбраны</span>
//           )}
//         </div>
//       </div> */}

//       {/* Галерея */}
//       {/* <div className="flex flex-col gap-2.5">
//         <p className="text-base">Галерея</p>
//         <div className="flex flex-wrap gap-2">
//           {gallery.map((file, idx) => (
//             <div key={idx} className="relative h-32 w-32 overflow-hidden rounded border border-(--secondary-color)">
//               <img src={URL.createObjectURL(file)} alt={`Фото ${idx + 1}`} className="h-full w-full object-cover" />
//               <button
//                 type="button"
//                 className="absolute top-1 right-1 rounded-full bg-white p-1 shadow transition hover:bg-(--error-color) hover:text-white"
//                 onClick={() => handleRemoveGalleryItem(idx)}
//               >
//                 <X size={14} />
//               </button>
//             </div>
//           ))}
//         </div>

//         <label className="flex h-32 w-32 cursor-pointer items-center justify-center rounded border-2 border-dashed border-(--secondary-color) bg-(--bg-op-1-color) transition hover:border-(--accent-color)">
//           <span className="text-center text-sm text-(--secondary-color)">Добавить фото</span>
//           <input type="file" accept="image/*" multiple onChange={handleGallery} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
//         </label>
//       </div> */}

//       {error && <p className="text-sm text-(--error-color)">{error}</p>}

//       {/* Кнопка сохранения */}
//       <AnimatePresence>
//         {(!isEdit || isChanged) && (
//           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.25 }}>
//             <Button className="mt-8 w-full" type="submit" variant="success" disabled={loading}>
//               {loading ? 'Сохранение...' : isEdit ? 'Сохранить изменения' : 'Создать компанию'}
//             </Button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </form>
//   );
// };

// export default CompanyForm;
