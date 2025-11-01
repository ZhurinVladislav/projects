// import Api from '@/app/api';
// import { useQuery } from '@tanstack/react-query';

// export const revalidate = 60; // ISR

// const TestContent = async () => {
//   // try {
//   // ISR-запрос (Next.js будет кэшировать HTML)
//   // const res = await fetch(`${API_URL}/posts`, {
//   //   headers: {
//   //     Accept: 'application/json',
//   //     'Content-Type': 'application/json',
//   //   },
//   //   next: { revalidate: 60 }, // можно указать прямо тут
//   // });

//   // if (!res.ok) {
//   //   throw new Error(`Ошибка: ${res.status}`);
//   // }

//   // const data = await res.json();
//   // const posts = FetchPostsSchema.parse(data); // проверка через Zod
//   //   const posts = await Api.fetchGetPosts();
//   //   return (
//   //     <section>
//   //       <h2>Посты</h2>
//   //       <ul>
//   //         {posts.data.map(post => (
//   //           <li key={post.id}>
//   //             <h2>Название: {post.title}</h2>
//   //             <p>Текст: {post.content}</p>
//   //           </li>
//   //         ))}
//   //       </ul>
//   //     </section>
//   //   );
//   // } catch (error) {
//   //   return <p>Ошибка загрузки: {String(error)}</p>;
//   // }

//   try {
//     const posts = await Api.fetchGetPosts();

//     return (
//       <section>
//         <h2>Посты</h2>
//         <ul>
//           {Array.isArray(posts.data) && posts.data.length > 0 ? (
//             posts.data.map(post => (
//               <li key={post.id}>
//                 <h2>{post.title}</h2>
//                 <p>{post.content}</p>
//               </li>
//             ))
//           ) : (
//             <li>Постов нет</li>
//           )}
//         </ul>
//       </section>
//     );
//   } catch (error) {
//     const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
//     return <p>Ошибка загрузки: {message}</p>;
//   }

//   try {
//     const posts = await Api.fetchGetPosts(); // SSR-запрос

//     return (
//       <section>
//         <h2>Посты</h2>
//         <ul>
//           {posts.data.map(post => (
//             <li key={post.id}>
//               <h2>Название: {post.title}</h2>
//               <p>Текст: {post.content}</p>
//             </li>
//           ))}
//         </ul>
//       </section>
//     );
//   } catch (error) {
//     return <p>Ошибка загрузки: {String(error)}</p>;
//   }

//   const postsQuery = useQuery(
//     {
//       queryFn: () => Api.fetchGetPosts(),
//       queryKey: ['posts'],
//     },
//     queryClient,
//   );

//   switch (postsQuery.status) {
//     case 'pending':
//       return <>Loading...</>;
//     // return <SectionSkeleton />;

//     case 'success':
//       return (
//         <section>
//           <h2>Посты</h2>
//           <ul>
//             {postsQuery.data.data.map(post => (
//               <li key={post.id}>
//                 <h2>Название: {post.title}</h2>
//                 <p>Текст: {post.content}</p>
//               </li>
//             ))}
//           </ul>
//         </section>
//       );
//     // return (
//     //   <section className="genres main-section">
//     //     <div className="genres__container container">
//     //       <h2 className="genres__title h-2">Жанры фильмов</h2>
//     //       <GenresList genres={postsQuery.data} />
//     //     </div>
//     //   </section>
//     // );

//     case 'error':
//       return <>{`${postsQuery.error}`}</>;
//     // return <NetworkError action={postsQuery.refetch} />;
//   }

//   // const res = await fetch(`${SITE.API_URL}/posts`, {
//   //   // Важно для SEO — запрос делается на сервере
//   //   cache: 'no-store', // всегда свежие данные (SSR)
//   //   // или next: { revalidate: 60 } если данные можно кэшировать
//   // });

//   // if (!res.ok) {
//   //   throw new Error('Ошибка загрузки постов');
//   // }

//   // const posts: IPost[] = await res.json();
// };

// export default TestContent;
