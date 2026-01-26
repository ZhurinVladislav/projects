// import { NextResponse } from 'next/server';
// import { z } from 'zod';
// import { API_URL, FRONTEND_TOKEN } from '../../config';

// export const ResponseMenuSchema = z.object({
//   status: z.boolean(),
//   message: z.string(),
//   data: z.array(
//     z.object({
//       id: z.number(),
//       title: z.string(),
//       alias: z.string(),
//       children: z
//         .array(
//           z.object({
//             id: z.number(),
//             title: z.string(),
//             alias: z.string(),
//           }),
//         )
//         .optional(),
//     }),
//   ),
// });

// export async function GET() {
//   try {
//     const res = await fetch(`${API_URL}/pages/menu`, {
//       headers: {
//         Accept: 'application/json',
//         'X-Frontend-Token': FRONTEND_TOKEN,
//       },
//       cache: 'no-store',
//     });

//     const data = await res.json();
//     const parsed = ResponseMenuSchema.parse(data);
//     return NextResponse.json(parsed);
//   } catch (error) {
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' }, { status: 500 });
//   }
// }
