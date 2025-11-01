// 'use client';

// import Api from '@/app/api';
// import Button from '@/components/ui/Button';
// import Checkbox from '@/components/ui/Checkbox';
// import Dropdown from '@/components/ui/Dropdown/Dropdown';
// import { TCompany, TCompanyService, TFetchCompanyServiceLink, TFetchCompanySocialSchema, TFetchCompanyWorkday } from '@/types';
// import { TStoreCategoryServices } from '@/types/CategoryServices/type';
// import { TPageSimple } from '@/types/pages/types';
// import { TService } from '@/types/Service/type';
// import { AnimatePresence, motion } from 'framer-motion';
// import { Clock, Link, Plus, Share2, X } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// interface IProp {
//   dataPages: TPageSimple[];
//   dataCategories: TStoreCategoryServices[];
//   dataServices: TService[];
//   obj?: TCompany;
// }

// // 🔹 ПРЕДОПРЕДЕЛЕННЫЕ ТИПЫ ДНЕЙ НЕДЕЛИ
// const WEEK_DAYS = [
//   { value: 'Понедельник', label: 'Понедельник' },
//   { value: 'Вторник', label: 'Вторник' },
//   { value: 'Среда', label: 'Среда' },
//   { value: 'Четверг', label: 'Четверг' },
//   { value: 'Пятница', label: 'Пятница' },
//   { value: 'Суббота', label: 'Суббота' },
//   { value: 'Воскресенье', label: 'Воскресенье' },
// ];

// // 🔹 ПРЕДОПРЕДЕЛЕННЫЕ ТИПЫ СОЦСЕТЕЙ И СЕРВИСОВ
// const SOCIAL_PLATFORMS = [
//   { value: 'VK', label: 'VK (ВКонтакте)' },
//   { value: 'Telegram', label: 'Telegram' },
//   { value: 'Instagram', label: 'Instagram' },
//   { value: 'WhatsApp', label: 'WhatsApp' },
//   { value: 'Viber', label: 'Viber' },
//   { value: 'YouTube', label: 'YouTube' },
//   { value: 'Facebook', label: 'Facebook' },
//   { value: 'Twitter', label: 'Twitter' },
//   { value: 'Одноклассники', label: 'Одноклассники' },
//   { value: 'TikTok', label: 'TikTok' },
//   { value: 'Дзен', label: 'Дзен' },
//   { value: 'Другое', label: 'Другое' },
// ];

// const SERVICE_TYPES = [
//   { value: '2GIS', label: '2GIS' },
//   { value: 'Яндекс.Карты', label: 'Яндекс.Карты' },
//   { value: 'Google Maps', label: 'Google Maps' },
//   { value: 'Яндекс.Справочник', label: 'Яндекс.Справочник' },
//   { value: 'Google Business', label: 'Google Business' },
//   { value: 'Flamp', label: 'Flamp' },
//   { value: 'Zoon', label: 'Zoon' },
//   { value: 'Yell', label: 'Yell' },
//   { value: 'Авито', label: 'Авито' },
//   { value: 'ЦИАН', label: 'ЦИАН' },
//   { value: 'Дром', label: 'Дром' },
//   { value: 'Другое', label: 'Другое' },
// ];

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

//   // 🔹 НОВЫЕ СОСТОЯНИЯ: Дни работы, соцсети, ссылки на сервисы
//   const [workdays, setWorkdays] = useState<TFetchCompanyWorkday[]>(obj?.workdays ?? []);
//   const [socials, setSocials] = useState<TFetchCompanySocialSchema[]>(obj?.socials ?? []);
//   const [servicesLinks, setServicesLinks] = useState<TFetchCompanyServiceLink[]>(obj?.servicesLinks ?? []);

//   // Загрузка изображений
//   const [mainImage, setMainImage] = useState<File | null>(null);
//   const [removeImage, setRemoveImage] = useState(false);
//   const [mainPreview, setMainPreview] = useState<string>(obj?.image ?? '');
//   const [gallery, setGallery] = useState<File[]>([]);

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

//   // 🔹 ФУНКЦИИ ДЛЯ ДНЕЙ РАБОТЫ (С ВЫПАДАЮЩИМ СПИСКОМ И ЗАЩИТОЙ ОТ ДУБЛИРОВАНИЯ)
//   const addWorkday = () => {
//     setWorkdays(prev => [...prev, { day: '', hours: '', isDayOff: false }]);
//     setIsChanged(true);
//   };

//   const updateWorkday = (index: number, field: keyof TFetchCompanyWorkday, value: string | boolean) => {
//     setWorkdays(prev => prev.map((day, i) => (i === index ? { ...day, [field]: value } : day)));
//     setIsChanged(true);
//   };

//   const removeWorkday = (index: number) => {
//     setWorkdays(prev => prev.filter((_, i) => i !== index));
//     setIsChanged(true);
//   };

//   // 🔹 Функция для получения доступных дней недели (исключая уже выбранные)
//   const getAvailableDays = () => {
//     const usedDays = workdays.map(w => w.day).filter(Boolean);
//     return WEEK_DAYS.filter(day => !usedDays.includes(day.value));
//   };

//   // 🔹 ФУНКЦИИ ДЛЯ СОЦИАЛЬНЫХ СЕТЕЙ (С ВЫПАДАЮЩИМ СПИСКОМ)
//   const addSocial = () => {
//     setSocials(prev => [...prev, { platform: '', url: '' }]);
//     setIsChanged(true);
//   };

//   const updateSocial = (index: number, field: keyof TFetchCompanySocialSchema, value: string) => {
//     setSocials(prev => prev.map((social, i) => (i === index ? { ...social, [field]: value } : social)));
//     setIsChanged(true);
//   };

//   const removeSocial = (index: number) => {
//     setSocials(prev => prev.filter((_, i) => i !== index));
//     setIsChanged(true);
//   };

//   // 🔹 ФУНКЦИИ ДЛЯ ССЫЛОК НА СЕРВИСЫ (С ВЫПАДАЮЩИМ СПИСКОМ)
//   const addServiceLink = () => {
//     setServicesLinks(prev => [...prev, { serviceName: '', url: '' }]);
//     setIsChanged(true);
//   };

//   const updateServiceLink = (index: number, field: keyof TFetchCompanyServiceLink, value: string) => {
//     setServicesLinks(prev => prev.map((link, i) => (i === index ? { ...link, [field]: value } : link)));
//     setIsChanged(true);
//   };

//   const removeServiceLink = (index: number) => {
//     setServicesLinks(prev => prev.filter((_, i) => i !== index));
//     setIsChanged(true);
//   };

//   // Добавление/удаление категорий
//   const categoryDropdown = dataCategories.map(cat => ({ label: cat.title, value: cat.id.toString() }));
//   const handleAddCategory = (value: string) => {
//     const selected = dataCategories.find(c => c.id === parseInt(value));
//     if (!selected || categories.some(c => c.id === selected.id)) return;
//     setCategories(prev => [...prev, selected]);
//     setIsChanged(true);
//   };

//   const handleRemoveCategory = (id: number) => {
//     setCategories(prev => prev.filter(c => c.id !== id));
//     setServices(prev => prev.filter(s => !s.category_ids.includes(id)));
//     setIsChanged(true);
//   };

//   // Добавление услуги
//   const handleAddService = (value: string) => {
//     const selected = dataServices.find(s => s.id === parseInt(value));
//     if (!selected || services.some(s => s.id === selected.id)) return;

//     const missingCategories = selected.category_ids.map(cid => dataCategories.find(c => c.id === cid)).filter(Boolean) as TStoreCategoryServices[];

//     setCategories(prev => {
//       const newCats = [...prev];
//       missingCategories.forEach(cat => {
//         if (!newCats.some(c => c.id === cat.id)) newCats.push(cat);
//       });
//       return newCats;
//     });

//     setServices(prev => [...prev, selected]);
//     setIsChanged(true);
//   };

//   const handleRemoveService = (id: number) => {
//     setServices(prev => prev.filter(s => s.id !== id));
//     setIsChanged(true);
//   };

//   const toggleService = (serviceId: number, checked: boolean) => {
//     if (checked) {
//       handleAddService(serviceId.toString());
//     } else {
//       handleRemoveService(serviceId);
//     }
//   };

//   const availableCategoriesDropdown = dataCategories.filter(cat => !categories.some(selected => selected.id === cat.id)).map(cat => ({ label: cat.title, value: cat.id.toString() }));
//   const isServiceChecked = (id: number) => services.some(s => s.id === id);

//   // Загрузка основного изображения
//   const handleMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setMainImage(file);
//     setMainPreview(URL.createObjectURL(file));
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
//       gallery.length > 0 ||
//       JSON.stringify(workdays) !== JSON.stringify(obj.workdays ?? []) ||
//       JSON.stringify(socials) !== JSON.stringify(obj.socials ?? []) ||
//       JSON.stringify(servicesLinks) !== JSON.stringify(obj.servicesLinks ?? []);
//     setIsChanged(fieldsChanged);
//   }, [pageId, title, introText, imgAlt, phone, siteUrl, experience, address, mapLink, promo, categories, services, mainImage, gallery, workdays, socials, servicesLinks, obj]);

//   // Сохранение
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       let payload: any = {
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
//         // 🔹 ДОБАВЛЯЕМ НОВЫЕ ДАННЫЕ
//         workdays: workdays.map(day => ({
//           day: day.day,
//           hours: day.hours,
//           is_day_off: day.isDayOff,
//         })),
//         socials: socials.map(social => ({
//           platform: social.platform,
//           url: social.url,
//         })),
//         services_links: servicesLinks.map(link => ({
//           service_name: link.serviceName,
//           url: link.url,
//         })),
//       };

//       console.log(payload);

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

//       {/* 🔹 ДНИ РАБОТЫ С ВЫПАДАЮЩИМ СПИСКОМ */}
//       <div className="rounded-lg border border-(--secondary-color) bg-(--bg-op-1-color) p-4">
//         <div className="mb-4 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Clock size={18} className="text-(--accent-color)" />
//             <h3 className="text-lg font-semibold">График работы</h3>
//           </div>
//           <Button type="button" onClick={addWorkday} className="flex items-center gap-2" disabled={getAvailableDays().length === 0}>
//             <Plus size={16} />
//             Добавить день
//           </Button>
//         </div>

//         {getAvailableDays().length === 0 && workdays.length > 0 && (
//           <div className="mb-3 rounded bg-blue-50 p-3">
//             <p className="text-sm text-blue-700">Все дни недели уже добавлены. Удалите один из дней, чтобы добавить новый.</p>
//           </div>
//         )}

//         <div className="space-y-3">
//           {workdays.map((workday, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: -5 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="flex items-center gap-3 rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-3"
//             >
//               <div className="flex-1">
//                 <Dropdown
//                   label="Выберите день"
//                   items={[
//                     // Сначала показываем выбранный день (если есть)
//                     ...(workday.day ? WEEK_DAYS.filter(d => d.value === workday.day) : []),
//                     // Затем доступные дни
//                     ...getAvailableDays(),
//                   ]}
//                   selectedValue={workday.day}
//                   onSelect={value => updateWorkday(index, 'day', value)}
//                   className="w-full"
//                 />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Часы работы (09:00-18:00)"
//                 value={workday.hours || ''}
//                 onChange={e => updateWorkday(index, 'hours', e.target.value)}
//                 className="flex-1 rounded border border-(--secondary-color) p-2 text-sm"
//               />
//               <Checkbox label="Выходной" checked={workday.isDayOff} onChange={e => updateWorkday(index, 'isDayOff', e.target.checked)} />
//               <button className="flex h-5 w-5 items-center justify-center rounded-sm bg-(--error-color)" onClick={() => removeWorkday(index)}>
//                 <X size={14} />
//               </button>
//             </motion.div>
//           ))}
//           {workdays.length === 0 && <p className="py-4 text-center text-sm text-(--secondary-color)">График работы не указан</p>}
//         </div>
//       </div>

//       {/* 🔹 СОЦИАЛЬНЫЕ СЕТИ С ВЫПАДАЮЩИМ СПИСКОМ */}
//       <div className="rounded-lg border border-(--secondary-color) bg-(--bg-op-1-color) p-4">
//         <div className="mb-4 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Share2 size={18} className="text-(--accent-color)" />
//             <h3 className="text-lg font-semibold">Социальные сети</h3>
//           </div>
//           <Button type="button" onClick={addSocial} className="flex items-center gap-2">
//             <Plus size={16} />
//             Добавить соцсеть
//           </Button>
//         </div>

//         <div className="space-y-3">
//           {socials.map((social, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: -5 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="flex items-center gap-3 rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-3"
//             >
//               <div className="flex-1">
//                 <Dropdown label="Выберите платформу" items={SOCIAL_PLATFORMS} selectedValue={social.platform} onSelect={value => updateSocial(index, 'platform', value)} className="w-full" />
//               </div>
//               <input
//                 type="url"
//                 placeholder="Ссылка на профиль"
//                 value={social.url || ''}
//                 onChange={e => updateSocial(index, 'url', e.target.value)}
//                 className="flex-1 rounded border border-(--secondary-color) p-2 text-sm"
//               />
//               <button className="flex h-5 w-5 items-center justify-center rounded-sm bg-(--error-color)" onClick={() => removeSocial(index)}>
//                 <X size={14} />
//               </button>
//             </motion.div>
//           ))}
//           {socials.length === 0 && <p className="py-4 text-center text-sm text-(--secondary-color)">Социальные сети не добавлены</p>}
//         </div>
//       </div>

//       {/* 🔹 ССЫЛКИ НА СЕРВИСЫ С ВЫПАДАЮЩИМ СПИСКОМ */}
//       <div className="rounded-lg border border-(--secondary-color) bg-(--bg-op-1-color) p-4">
//         <div className="mb-4 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Link size={18} className="text-(--accent-color)" />
//             <h3 className="text-lg font-semibold">Ссылки на сервисы</h3>
//           </div>
//           <Button type="button" onClick={addServiceLink} className="flex items-center gap-2">
//             <Plus size={16} />
//             Добавить ссылку
//           </Button>
//         </div>

//         <div className="space-y-3">
//           {servicesLinks.map((link, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: -5 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="flex items-center gap-3 rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-3"
//             >
//               <div className="flex-1">
//                 <Dropdown label="Выберите сервис" items={SERVICE_TYPES} selectedValue={link.serviceName} onSelect={value => updateServiceLink(index, 'serviceName', value)} className="w-full" />
//               </div>
//               <input
//                 type="url"
//                 placeholder="Ссылка на сервис"
//                 value={link.url || ''}
//                 onChange={e => updateServiceLink(index, 'url', e.target.value)}
//                 className="flex-1 rounded border border-(--secondary-color) p-2 text-sm"
//               />
//               <button className="flex h-5 w-5 items-center justify-center rounded-sm bg-(--error-color)" onClick={() => removeServiceLink(index)}>
//                 <X size={14} />
//               </button>
//             </motion.div>
//           ))}
//           {servicesLinks.length === 0 && <p className="py-4 text-center text-sm text-(--secondary-color)">Ссылки на сервисы не добавлены</p>}
//         </div>
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
//                   <button className="flex h-5 w-5 items-center justify-center rounded-sm bg-(--error-color)" onClick={() => handleRemoveCategory(cat.id)}>
//                     <X size={14} />
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-3">
//                   {catServices.map(s => (
//                     <Checkbox key={s.id} id={`service-${s.id}`} label={s.title} checked={isServiceChecked(s.id)} onChange={e => toggleService(s.id, e.target.checked)} />
//                   ))}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>

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
