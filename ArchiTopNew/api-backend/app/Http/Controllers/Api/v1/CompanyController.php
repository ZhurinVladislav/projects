<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\v1\CompanyResource;
use App\Models\ServiceCategory;
use Illuminate\Http\Request;
use Exception;

class CompanyController extends Controller
{
    /**
     * Преобразует строку с ID через запятую или массив в массив чисел.
     */
    private function parseIds($value): array
    {
        if (is_array($value)) {
            return array_filter($value, 'is_numeric');
        }

        // Пример: "1,2,3" → [1,2,3]
        return array_filter(explode(',', $value), 'is_numeric');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Company::with(['ratings', 'serviceCategories', 'services', 'propertyTypes']);

            // Фильтры
            if ($request->has('promo')) {
                $query->where('promo', $request->boolean('promo'));
            }

            if ($request->filled('service_id')) {
                $query->whereHas('services', function ($q) use ($request) {
                    $q->where('services.id', $request->input('service_id'));
                });
            }

            if ($request->filled('category_id')) {
                $query->whereHas('serviceCategories', function ($q) use ($request) {
                    $q->where('service_categories.id', $request->input('category_id'));
                });
            }

            if ($request->filled('property_type_id')) {
                $query->whereHas('propertyTypes', function ($q) use ($request) {
                    $q->where('property_types.id', $request->input('property_type_id'));
                });
            }

            // сортировка / пагинация
            $perPage = (int) $request->input('per_page', 20);
            $companies = $query->orderBy('title')->paginate($perPage);

            return response()->json([
                'status' => true,
                'message' => 'Companies retrieved successfully',
                'data' => CompanyResource::collection($companies),
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve companies: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(StoreCompanyRequest $request): JsonResponse
    // {
    //     try {
    //         $data = $request->validated();

    //         // загрузка основного изображения (если есть)
    //         if ($request->hasFile('image')) {
    //             $data['image_path'] = $request->file('image')->store('companies', 'public');
    //         }

    //         $company = Company::create($data);

    //         // синхронизация M:N связей (если переданы)
    //         if (!empty($data['service_category_ids'])) {
    //             $company->serviceCategories()->sync($data['service_category_ids']);
    //         }

    //         if (!empty($data['service_ids'])) {
    //             $company->services()->sync($data['service_ids']);
    //         }

    //         if (!empty($data['property_type_ids'])) {
    //             $company->propertyTypes()->sync($data['property_type_ids']);
    //         }

    //         return response()->json([
    //             'status' => true,
    //             'message' => 'Company created successfully',
    //             'data' => new CompanyResource($company->load(['rating', 'serviceCategories', 'services', 'propertyTypes'])),
    //         ], 201);
    //     } catch (Exception $e) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Failed to create company: ' . $e->getMessage(),
    //             'data' => null,
    //         ], 500);
    //     }
    // }

    public function store(StoreCompanyRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();

            // загрузка основного изображения (если есть)
            if ($request->hasFile('image')) {
                $data['image_path'] = $request->file('image')->store('companies', 'public');
            }

            $company = Company::create($data);

            // синхронизация M:N связей (если переданы)
            if (!empty($data['service_category_ids'])) {
                $company->serviceCategories()->sync($data['service_category_ids']);
            }

            if (!empty($data['service_ids'])) {
                $company->services()->sync($data['service_ids']);
            }

            if (!empty($data['property_type_ids'])) {
                $company->propertyTypes()->sync($data['property_type_ids']);
            }

            // 🔹 ДОБАВИТЬ создание дней работы
            if (!empty($data['workdays'])) {
                foreach ($data['workdays'] as $workday) {
                    $company->workdays()->create([
                        'day' => $workday['day'],
                        'hours' => $workday['hours'],
                        'is_day_off' => $workday['is_day_off'] ?? false,
                    ]);
                }
            }

            // 🔹 ДОБАВИТЬ создание социальных сетей
            if (!empty($data['socials'])) {
                foreach ($data['socials'] as $social) {
                    $company->socials()->create([
                        'platform' => $social['platform'],
                        'url' => $social['url'],
                    ]);
                }
            }

            // 🔹 ДОБАВИТЬ создание ссылок на сервисы
            if (!empty($data['services_links'])) {
                foreach ($data['services_links'] as $serviceLink) {
                    $company->servicesLinks()->create([
                        'service_name' => $serviceLink['service_name'],
                        'url' => $serviceLink['url'],
                    ]);
                }
            }

            // 🔹 ДОБАВИТЬ создание рейтингов с платформ
            if (!empty($data['ratings'])) {
                foreach ($data['ratings'] as $rating) {
                    $company->ratings()->create([
                        'type' => $rating['type'],
                        'link' => $rating['link'] ?? null,
                        'rating' => $rating['rating'],
                        'total_reviews' => $rating['total_reviews'],
                    ]);
                }
            }

            return response()->json([
                'status' => true,
                'message' => 'Company created successfully',
                'data' => new CompanyResource($company->load([
                    'ratings',
                    'serviceCategories',
                    'services',
                    'propertyTypes',
                    'workdays',
                    'socials',
                    'servicesLinks'
                ])),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to create company: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company): JsonResponse
    {
        try {
            $company->load([
                'ratings',
                'socials',
                'servicesLinks',
                'workdays',
                'gallery',
                'serviceCategories',
                'services',
                'propertyTypes',
                'reviews',
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Company retrieved successfully',
                'data' => new CompanyResource($company),
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve company: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    // public function update(UpdateCompanyRequest $request, Company $company): JsonResponse
    // {
    //     try {
    //         $data = $request->validated();

    //         // 🔹 Удаление изображения, если пришёл флаг
    //         if ($request->boolean('remove_image') && $company->image_path) {
    //             if (Storage::disk('public')->exists($company->image_path)) {
    //                 Storage::disk('public')->delete($company->image_path);
    //             }
    //             $data['image_path'] = null;
    //         }

    //         // 🔹 Загрузка нового изображения
    //         if ($request->hasFile('image')) {
    //             if ($company->image_path && Storage::disk('public')->exists($company->image_path)) {
    //                 Storage::disk('public')->delete($company->image_path);
    //             }
    //             $data['image_path'] = $request->file('image')->store('companies', 'public');
    //         }

    //         // 🔹 Обновляем компанию
    //         $company->update($data);

    //         // 🔹 Синхронизация M:N связей
    //         if (array_key_exists('service_category_ids', $data)) {
    //             $company->serviceCategories()->sync($data['service_category_ids'] ?? []);
    //         }

    //         if (array_key_exists('service_ids', $data)) {
    //             $company->services()->sync($data['service_ids'] ?? []);
    //         }

    //         if (array_key_exists('property_type_ids', $data)) {
    //             $company->propertyTypes()->sync($data['property_type_ids'] ?? []);
    //         }

    //         return response()->json([
    //             'status' => true,
    //             'message' => 'Company updated successfully',
    //             'data' => new CompanyResource($company->fresh([
    //                 'rating',
    //                 'serviceCategories',
    //                 'services',
    //                 'propertyTypes',
    //             ])),
    //         ]);
    //     } catch (Exception $e) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Failed to update company: ' . $e->getMessage(),
    //             'data' => null,
    //         ], 500);
    //     }
    //     // try {
    //     //     $data = $request->validated();

    //     //     // обновление изображения: удаляем старое, сохраняем новое
    //     //     if ($request->hasFile('image')) {
    //     //         if ($company->image_path && Storage::disk('public')->exists($company->image_path)) {
    //     //             Storage::disk('public')->delete($company->image_path);
    //     //         }
    //     //         $data['image_path'] = $request->file('image')->store('companies', 'public');
    //     //     }

    //     //     $company->update($data);

    //     //     // синхронизация M:N связей (если переданы)
    //     //     if (array_key_exists('service_category_ids', $data)) {
    //     //         $company->serviceCategories()->sync($data['service_category_ids'] ?? []);
    //     //     }

    //     //     if (array_key_exists('service_ids', $data)) {
    //     //         $company->services()->sync($data['service_ids'] ?? []);
    //     //     }

    //     //     if (array_key_exists('property_type_ids', $data)) {
    //     //         $company->propertyTypes()->sync($data['property_type_ids'] ?? []);
    //     //     }

    //     //     if ($request->boolean('remove_image') && $company->image_path) {
    //     //         Storage::disk('public')->delete($company->image_path);
    //     //         $data['image_path'] = null;
    //     //     }

    //     //     return response()->json([
    //     //         'status' => true,
    //     //         'message' => 'Company updated successfully',
    //     //         'data' => new CompanyResource($company->fresh([
    //     //             'rating',
    //     //             'serviceCategories',
    //     //             'services',
    //     //             'propertyTypes',
    //     //         ])),
    //     //     ]);
    //     // } catch (Exception $e) {
    //     //     return response()->json([
    //     //         'status' => false,
    //     //         'message' => 'Failed to update company: ' . $e->getMessage(),
    //     //         'data' => null,
    //     //     ], 500);
    //     // }
    // }

    public function update(UpdateCompanyRequest $request, Company $company): JsonResponse
    {
        try {
            $data = $request->validated();

            // 🔹 Удаление изображения, если пришёл флаг
            if ($request->boolean('remove_image') && $company->image_path) {
                if (Storage::disk('public')->exists($company->image_path)) {
                    Storage::disk('public')->delete($company->image_path);
                }
                $data['image_path'] = null;
            }

            // 🔹 Загрузка нового изображения
            if ($request->hasFile('image')) {
                if ($company->image_path && Storage::disk('public')->exists($company->image_path)) {
                    Storage::disk('public')->delete($company->image_path);
                }
                $data['image_path'] = $request->file('image')->store('companies', 'public');
            }

            // 🔹 Обновляем компанию
            $company->update($data);

            // 🔹 Синхронизация M:N связей
            if (array_key_exists('service_category_ids', $data)) {
                $company->serviceCategories()->sync($data['service_category_ids'] ?? []);
            }

            if (array_key_exists('service_ids', $data)) {
                $company->services()->sync($data['service_ids'] ?? []);
            }

            if (array_key_exists('property_type_ids', $data)) {
                $company->propertyTypes()->sync($data['property_type_ids'] ?? []);
            }

            // 🔹 ДОБАВИТЬ обновление дней работы
            if (array_key_exists('workdays', $data)) {
                // Удаляем старые дни работы и создаем новые
                $company->workdays()->delete();
                foreach ($data['workdays'] as $workday) {
                    $company->workdays()->create([
                        'day' => $workday['day'],
                        'hours' => $workday['hours'],
                        'is_day_off' => $workday['is_day_off'] ?? false,
                    ]);
                }
            }
            // if (array_key_exists('workdays', $data)) {
            //     $existingWorkdays = $company->workdays->keyBy('id');

            //     foreach ($data['workdays'] as $workdayData) {
            //         if (isset($workdayData['id']) && $existingWorkdays->has($workdayData['id'])) {
            //             // Обновляем существующий
            //             $existingWorkdays[$workdayData['id']]->update($workdayData);
            //         } else {
            //             // Создаем новый
            //             $company->workdays()->create($workdayData);
            //         }
            //     }

            //     // Удаляем не переданные дни
            //     $submittedIds = collect($data['workdays'])->pluck('id')->filter();
            //     $company->workdays()->whereNotIn('id', $submittedIds)->delete();
            // }

            // 🔹 ДОБАВИТЬ обновление социальных сетей
            if (array_key_exists('socials', $data)) {
                $company->socials()->delete();
                foreach ($data['socials'] as $social) {
                    $company->socials()->create([
                        'platform' => $social['platform'],
                        'url' => $social['url'],
                    ]);
                }
            }

            // 🔹 ДОБАВИТЬ обновление рейтингов с платформ
            if (array_key_exists('ratings', $data)) {
                $existingRatingIds = [];

                foreach ($data['ratings'] as $ratingData) {
                    if (isset($ratingData['id'])) {
                        // Обновляем существующий рейтинг
                        $rating = $company->ratings()->where('id', $ratingData['id'])->first();
                        if ($rating) {
                            $rating->update($ratingData);
                            $existingRatingIds[] = $ratingData['id'];
                        }
                    } else {
                        // Создаем новый рейтинг
                        $newRating = $company->ratings()->create($ratingData);
                        $existingRatingIds[] = $newRating->id;
                    }
                }

                // Удаляем рейтинги, которых нет в запросе
                $company->ratings()->whereNotIn('id', $existingRatingIds)->delete();
            }

            // 🔹 ДОБАВИТЬ обновление ссылок на сервисы
            if (array_key_exists('services_links', $data)) {
                $company->servicesLinks()->delete();
                foreach ($data['services_links'] as $serviceLink) {
                    $company->servicesLinks()->create([
                        'service_name' => $serviceLink['service_name'],
                        'url' => $serviceLink['url'],
                    ]);
                }
            }

            return response()->json([
                'status' => true,
                'message' => 'Company updated successfully',
                'data' => new CompanyResource($company->fresh([
                    'ratings',
                    'serviceCategories',
                    'services',
                    'propertyTypes',
                    'workdays', // 🔹 добавить загрузку новых связей
                    'socials',
                    'servicesLinks',
                ])),
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to update company: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company): JsonResponse
    {
        try {
            // удаляем основное изображение если есть
            if ($company->image_path && Storage::disk('public')->exists($company->image_path)) {
                Storage::disk('public')->delete($company->image_path);
            }

            // модель Company в booted() уже очищает связанные записи/файлы и detach M:N,
            // но удаляем саму запись здесь:
            $company->delete();

            return response()->json([
                'status' => true,
                'message' => 'Company deleted successfully',
                'data' => null,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to delete company: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Получить компании по ID категории услуги (с фильтрами, сортировкой и пагинацией).
     */
    public function getByServiceCategory(Request $request, int $serviceCategoryId): JsonResponse
    {
        try {
            $query = Company::with(['rating', 'serviceCategories', 'services', 'propertyTypes'])
                ->whereHas('serviceCategories', fn($q) => $q->where('service_categories.id', $serviceCategoryId));

            // 🔹 Фильтры
            if ($request->filled('service_id')) {
                $serviceIds = $this->parseIds($request->input('service_id'));
                $query->whereHas('services', fn($q) => $q->whereIn('services.id', $serviceIds));
            }

            if ($request->filled('property_type_id')) {
                $propertyTypeIds = $this->parseIds($request->input('property_type_id'));
                $query->whereHas('propertyTypes', fn($q) => $q->whereIn('property_types.id', $propertyTypeIds));
            }

            if ($request->has('promo')) {
                $query->where('promo', $request->boolean('promo'));
            }

            // 🔹 Сортировка
            $sort = $request->input('sort', 'title');
            $order = $request->input('order', 'asc');

            switch ($sort) {
                case 'rating':
                    $query->with('rating')
                        ->orderByRaw('(SELECT rating FROM company_ratings WHERE company_ratings.company_id = companies.id) ' . $order);
                    break;

                case 'reviews':
                    $query->withCount('reviews')->orderBy('reviews_count', $order);
                    break;

                default:
                    $query->orderBy('title', $order);
                    break;
            }

            // 🔹 Пагинация
            $perPage = (int) $request->input('per_page', 20);
            $companies = $query->paginate($perPage);

            return response()->json([
                'status' => true,
                'message' => 'Companies retrieved successfully by service category',
                'data' => CompanyResource::collection($companies),
                'meta' => [
                    'current_page' => $companies->currentPage(),
                    'last_page' => $companies->lastPage(),
                    'per_page' => $companies->perPage(),
                    'total' => $companies->total(),
                ],
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve companies: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Получить компании по странице (через связанную категорию услуги).
     * GET /api/v1/companies/by-page/{pageId}?sort=rating|reviews|title&order=desc&per_page=20&page=1
     */
    // public function companiesByPage(int $pageId, Request $request): JsonResponse
    // {
    //     try {
    //         // 🔹 Находим категорию услуги по page_id
    //         $category = ServiceCategory::with(['page.parent'])->where('page_id', $pageId)->first();

    //         if (!$category) {
    //             return response()->json([
    //                 'status' => false,
    //                 'message' => 'Service category not found for this page.',
    //                 'data' => null,
    //             ], 404);
    //         }

    //         // 🔹 Формируем запрос компаний
    //         $query = Company::with([
    //             'page.parent', // <-- добавляем для построения URL
    //             'ratings',
    //             'serviceCategories.page.parent',
    //             'services',
    //             'propertyTypes',
    //         ])->whereHas('serviceCategories', fn($q) => $q->where('service_categories.id', $category->id));

    //         // 🔹 Фильтры
    //         if ($request->filled('service_id')) {
    //             $serviceIds = $this->parseIds($request->input('service_id'));
    //             $query->whereHas('services', fn($q) => $q->whereIn('services.id', $serviceIds));
    //         }

    //         if ($request->filled('property_type_id')) {
    //             $propertyTypeIds = $this->parseIds($request->input('property_type_id'));
    //             $query->whereHas('propertyTypes', fn($q) => $q->whereIn('property_types.id', $propertyTypeIds));
    //         }

    //         if ($request->has('promo')) {
    //             $query->where('promo', $request->boolean('promo'));
    //         }

    //         // 🔹 Сортировка
    //         $sort = $request->input('sort', 'title');
    //         $order = $request->input('order', 'asc');

    //         switch ($sort) {
    //             case 'ratings':
    //                 $query->with('ratings')
    //                     ->orderByRaw('(SELECT rating FROM company_ratings WHERE company_ratings.company_id = companies.id) ' . $order);
    //                 break;

    //             case 'reviews':
    //                 $query->withCount('reviews')->orderBy('reviews_count', $order);
    //                 break;

    //             default:
    //                 $query->orderBy('title', $order);
    //                 break;
    //         }

    //         // 🔹 Пагинация
    //         $perPage = (int) $request->input('per_page', 20);
    //         $companies = $query->paginate($perPage);

    //         return response()->json([
    //             'status' => true,
    //             'message' => 'Companies retrieved successfully for this page.',
    //             'data' => CompanyResource::collection($companies),
    //             'meta' => [
    //                 'current_page' => $companies->currentPage(),
    //                 'last_page' => $companies->lastPage(),
    //                 'per_page' => $companies->perPage(),
    //                 'total' => $companies->total(),
    //             ],
    //         ]);
    //     } catch (\Throwable $e) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Failed to retrieve companies: ' . $e->getMessage(),
    //             'data' => null,
    //         ], 500);
    //     }
    // }
    /**
     * Получить компании по странице (если pageId отсутствует — вывести все компании).
     * GET /api/v1/companies/by-page/{pageId?}?sort=rating|reviews|title&order=desc&per_page=20&page=1
     */
    public function companiesByPage(Request $request, ?int $pageId = null): JsonResponse
    {
        try {
            // -----------------------------------------------------
            // 🔹 1. Базовый запрос компаний (для случая без pageId)
            // -----------------------------------------------------
            $query = Company::with([
                'page.parent',
                'ratings',
                'serviceCategories.page.parent',
                'services',
                'propertyTypes',
            ]);

            // -----------------------------------------------------
            // 🔹 2. Если передан pageId — фильтруем через категорию услуги
            // -----------------------------------------------------
            if ($pageId !== null) {
                $category = ServiceCategory::with(['page.parent'])
                    ->where('page_id', $pageId)
                    ->first();

                if (!$category) {
                    return response()->json([
                        'status'   => false,
                        'message'  => 'Service category not found for this page.',
                        'data'     => null,
                    ], 404);
                }

                // Фильтруем только по этой категории
                $query->whereHas('serviceCategories', function ($q) use ($category) {
                    $q->where('service_categories.id', $category->id);
                });
            }

            // -----------------------------------------------------
            // 🔹 3. Применяем GET-фильтры (работают в обоих режимах)
            // -----------------------------------------------------
            if ($request->filled('service_id')) {
                $serviceIds = $this->parseIds($request->input('service_id'));
                $query->whereHas('services', fn($q) => $q->whereIn('services.id', $serviceIds));
            }

            if ($request->filled('property_type_id')) {
                $propertyTypeIds = $this->parseIds($request->input('property_type_id'));
                $query->whereHas('propertyTypes', fn($q) => $q->whereIn('property_types.id', $propertyTypeIds));
            }

            if ($request->has('promo')) {
                $query->where('promo', $request->boolean('promo'));
            }

            // -----------------------------------------------------
            // 🔹 4. Сортировка
            // -----------------------------------------------------
            $sort = $request->input('sort', 'title');
            $order = $request->input('order', 'asc');

            switch ($sort) {
                case 'ratings':
                    $query->with('ratings')
                        ->orderByRaw('(SELECT rating FROM company_ratings WHERE company_ratings.company_id = companies.id) ' . $order);
                    break;

                case 'reviews':
                    $query->withCount('reviews')->orderBy('reviews_count', $order);
                    break;

                default:
                    $query->orderBy('title', $order);
                    break;
            }

            // -----------------------------------------------------
            // 🔹 5. Пагинация и вывод
            // -----------------------------------------------------
            $perPage = (int)$request->input('per_page', 20);
            $companies = $query->paginate($perPage);

            return response()->json([
                'status'  => true,
                'message' => $pageId
                    ? 'Companies retrieved successfully for this page.'
                    : 'All companies retrieved successfully.',
                'data'    => CompanyResource::collection($companies),
                'meta'    => [
                    'current_page' => $companies->currentPage(),
                    'last_page'    => $companies->lastPage(),
                    'per_page'     => $companies->perPage(),
                    'total'        => $companies->total(),
                ],
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'status'   => false,
                'message'  => 'Failed to retrieve companies: ' . $e->getMessage(),
                'data'     => null,
            ], 500);
        }
    }

    /**
     * 🔍 Получить компанию по ID страницы.
     *
     * Пример:
     * GET /api/v1/companies/page/12
     */
    public function companyByPage(Request $request, int $pageId): JsonResponse
    {
        try {
            // 🔹 1. Пробуем найти компанию, у которой есть page_id напрямую
            $company = Company::with([
                'page.parent',
                'ratings',
                'rating',
                'serviceCategories.services.companies',
                'services',
                'propertyTypes',
                'socials',
                'servicesLinks',
                'workdays',
            ])->where('page_id', $pageId)->first();

            // 🔹 2. Если компании по page_id нет — ищем через категорию (старый способ)
            if (!$company) {
                $category = ServiceCategory::where('page_id', $pageId)->first();

                if ($category) {
                    // Берем первую компанию из категории
                    $company = $category->companies()->with([
                        'page.parent',
                        'ratings',
                        'rating',
                        'serviceCategories.page.parent',
                        'services',
                        'propertyTypes',
                        'socials',
                        'servicesLinks',
                        'workdays',
                    ])->first();
                }
            }

            // 🔹 3. Проверяем результат
            if (!$company) {
                return response()->json([
                    'status' => false,
                    'message' => 'Company not found for this page.',
                    'data' => null,
                ], 404);
            }

            // 🔹 4. Успешный ответ с ОДНОЙ компанией
            return response()->json([
                'status' => true,
                'message' => 'Company loaded successfully.',
                'data' => new CompanyResource($company),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to load company: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
    // public function companyByPage(Request $request, int $pageId): JsonResponse
    // {
    //     try {
    //         // 🔹 1. Пробуем найти компании, у которых есть page_id напрямую
    //         $companies = Company::with([
    //             'page.parent',
    //             'ratings',
    //             'rating',
    //             // 'totalReviews',
    //             'serviceCategories.services.companies', // ← вот так, важно!
    //             'services',
    //             'propertyTypes',
    //             'socials',
    //             'servicesLinks',
    //             'workdays',
    //             // 'gallery',
    //         ])->where('page_id', $pageId)->get();

    //         // 🔹 2. Если компаний по page_id нет — ищем через категорию (старый способ)
    //         if ($companies->isEmpty()) {
    //             $category = ServiceCategory::where('page_id', $pageId)->first();

    //             if ($category) {
    //                 $companies = $category->companies()->with([
    //                     'page.parent',
    //                     'ratings',
    //                     'rating',
    //                     // 'totalReviews',
    //                     'serviceCategories.page.parent',
    //                     'services',
    //                     'propertyTypes',
    //                     'socials',
    //                     'servicesLinks',
    //                     'workdays',
    //                     // 'gallery',
    //                 ])->get();
    //             }
    //         }

    //         // 🔹 3. Проверяем результат
    //         if ($companies->isEmpty()) {
    //             return response()->json([
    //                 'status' => true,
    //                 'message' => 'No companies found for this page.',
    //                 'data' => [],
    //             ]);
    //         }

    //         // 🔹 4. Успешный ответ
    //         return response()->json([
    //             'status' => true,
    //             'message' => 'Companies loaded successfully.',
    //             'data' => CompanyResource::collection($companies),
    //         ]);
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Failed to load companies: ' . $e->getMessage(),
    //             'data' => null,
    //         ], 500);
    //     }
    // }


    // public function companyByPage(int $pageId): JsonResponse
    // {
    //     try {
    //         // Находим компанию, связанную с этой страницей
    //         $company = Company::with([
    //             'rating',
    //             'socials',
    //             'servicesLinks',
    //             'workdays',
    //             'gallery',
    //             'serviceCategories',
    //             'services',
    //             'propertyTypes',
    //             'reviews',
    //         ])->where('page_id', $pageId)->first();

    //         if (!$company) {
    //             return response()->json([
    //                 'status' => false,
    //                 'message' => 'Company not found for this page.',
    //                 'data' => null,
    //             ], 404);
    //         }

    //         return response()->json([
    //             'status' => true,
    //             'message' => 'Company retrieved successfully for this page.',
    //             'data' => new CompanyResource($company),
    //         ]);
    //     } catch (\Throwable $e) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Failed to retrieve company: ' . $e->getMessage(),
    //             'data' => null,
    //         ], 500);
    //     }
    // }

    // /**
    //  * Получить компании по ID категории услуги (с фильтрами, сортировкой и пагинацией).
    //  * GET /api/v1/companies/by-category/{serviceCategoryId}?sort=rating|reviews|title&order=desc&per_page=20&page=1
    //  */
    // public function getByServiceCategory(Request $request, int $serviceCategoryId): JsonResponse
    // {
    //     try {
    //         $query = Company::with(['rating', 'serviceCategories', 'services', 'propertyTypes'])
    //             ->whereHas('serviceCategories', function ($q) use ($serviceCategoryId) {
    //                 $q->where('service_categories.id', $serviceCategoryId);
    //             });

    //         // 🔹 Фильтры
    //         if ($request->filled('service_id')) {
    //             $query->whereHas('services', fn($q) => $q->where('services.id', $request->input('service_id')));
    //         }

    //         if ($request->filled('property_type_id')) {
    //             $query->whereHas('propertyTypes', fn($q) => $q->where('property_types.id', $request->input('property_type_id')));
    //         }

    //         if ($request->has('promo')) {
    //             $query->where('promo', $request->boolean('promo'));
    //         }

    //         // 🔹 Сортировка
    //         $sort = $request->input('sort', 'title'); // rating | reviews | title
    //         $order = $request->input('order', 'asc');

    //         switch ($sort) {
    //             case 'rating':
    //                 $query->leftJoin('ratings', 'companies.id', '=', 'ratings.company_id')
    //                     ->select('companies.*')
    //                     ->orderBy('ratings.value', $order);
    //                 break;

    //             case 'reviews':
    //                 $query->withCount('reviews')
    //                     ->orderBy('reviews_count', $order);
    //                 break;

    //             default:
    //                 $query->orderBy('title', $order);
    //                 break;
    //         }

    //         // 🔹 Пагинация
    //         $perPage = (int) $request->input('per_page', 20);
    //         $companies = $query->paginate($perPage);

    //         return response()->json([
    //             'status' => true,
    //             'message' => 'Companies retrieved successfully by service category',
    //             'data' => CompanyResource::collection($companies),
    //             'meta' => [
    //                 'current_page' => $companies->currentPage(),
    //                 'last_page' => $companies->lastPage(),
    //                 'per_page' => $companies->perPage(),
    //                 'total' => $companies->total(),
    //             ],
    //         ]);
    //     } catch (Exception $e) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Failed to retrieve companies: ' . $e->getMessage(),
    //             'data' => null,
    //         ], 500);
    //     }
    // }

    // /**
    //  * Получить компании по странице (через связанную категорию услуги).
    //  * То есть: по page_id → ищем категорию → выводим компании этой категории.
    //  * GET /api/v1/companies/by-page/{pageId}?sort=rating|reviews|title&order=desc&per_page=20&page=1
    //  */
    // public function companiesByPage(int $pageId, Request $request): JsonResponse
    // {
    //     try {
    //         // 🔹 Находим категорию, связанную с этой страницей
    //         $category = ServiceCategory::where('page_id', $pageId)->first();

    //         if (!$category) {
    //             return response()->json([
    //                 'status' => false,
    //                 'message' => 'Service category not found for this page.',
    //                 'data' => null,
    //             ], 404);
    //         }

    //         // 🔹 Получаем компании
    //         $query = Company::with(['rating', 'serviceCategories', 'services', 'propertyTypes'])
    //             ->whereHas('serviceCategories', fn($q) => $q->where('service_categories.id', $category->id));

    //         // 🔹 Фильтры (те же, что и выше)
    //         if ($request->filled('service_id')) {
    //             $query->whereHas('services', fn($q) => $q->where('services.id', $request->input('service_id')));
    //         }

    //         if ($request->filled('property_type_id')) {
    //             $query->whereHas('propertyTypes', fn($q) => $q->where('property_types.id', $request->input('property_type_id')));
    //         }

    //         if ($request->has('promo')) {
    //             $query->where('promo', $request->boolean('promo'));
    //         }

    //         // 🔹 Сортировка
    //         $sort = $request->input('sort', 'title'); // rating | reviews | title
    //         $order = $request->input('order', 'asc');

    //         switch ($sort) {
    //             case 'rating':
    //                 $query->leftJoin('ratings', 'companies.id', '=', 'ratings.company_id')
    //                     ->select('companies.*')
    //                     ->orderBy('ratings.value', $order);
    //                 break;

    //             case 'reviews':
    //                 $query->withCount('reviews')
    //                     ->orderBy('reviews_count', $order);
    //                 break;

    //             default:
    //                 $query->orderBy('title', $order);
    //                 break;
    //         }

    //         // 🔹 Пагинация
    //         $perPage = (int) $request->input('per_page', 20);
    //         $companies = $query->paginate($perPage);

    //         return response()->json([
    //             'status' => true,
    //             'message' => 'Companies retrieved successfully for this page.',
    //             'data' => CompanyResource::collection($companies),
    //             'meta' => [
    //                 'current_page' => $companies->currentPage(),
    //                 'last_page' => $companies->lastPage(),
    //                 'per_page' => $companies->perPage(),
    //                 'total' => $companies->total(),
    //             ],
    //         ]);
    //     } catch (Exception $e) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Failed to retrieve companies: ' . $e->getMessage(),
    //             'data' => null,
    //         ], 500);
    //     }
    // }


    /**
     * Доп. метод: привязать/отвязать типы недвижимости (удобно для админки).
     * POST /api/v1/companies/{company}/attach-property-types
     * Тело: { "property_type_ids": [1,2,3] }
     */
    public function attachPropertyTypes(Request $request, Company $company): JsonResponse
    {
        try {
            $ids = $request->input('property_type_ids', []);
            $company->propertyTypes()->sync($ids);

            return response()->json([
                'status' => true,
                'message' => 'Property types attached successfully',
                'data' => null,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to attach property types: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
}
