<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Http\Requests\StorePageRequest;
use App\Http\Requests\UpdatePageRequest;
use App\Http\Resources\v1\PageResource;
use Illuminate\Http\JsonResponse;
use Exception;

class PageController extends Controller
{
    /**
     * Список всех страниц (с возможностью вложенности).
     */
    public function index(): JsonResponse
    {
        try {
            // $pages = Page::with('children')->whereNull('parent_id')->orderBy('id')->get();
            $pages = Page::all();

            return response()->json([
                'status' => true,
                'message' => 'Pages retrieved successfully',
                'data' => PageResource::collection($pages),
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve pages: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Метод для вывода id и названия всех страниц.
     */
    public function listSimple(): JsonResponse
    {
        try {
            $pages = Page::query()
                ->select('id', 'page_title as pageTitle')
                ->orderByDesc('id') // сортируем по id от новых к старым
                ->get()
                ->values(); // гарантирует порядок при сериализации

            return response()->json([
                'status' => true,
                'message' => 'Page list retrieved successfully',
                'data' => $pages,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve page list: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Создание новой страницы.
     */
    public function store(StorePageRequest $request): JsonResponse
    {
        try {
            $page = Page::create($request->validated());
            return response()->json([
                'status' => true,
                'message' => 'Page created successfully',
                'data' => new PageResource($page),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to create page: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Просмотр конкретной страницы по alias или id.
     */
    public function show(Page $page): JsonResponse
    {
        try {
            $page->load('children', 'parent');
            return response()->json([
                'status' => true,
                'message' => 'Page retrieved successfully',
                'data' => new PageResource($page),
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve page: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Поиск страницы по полному alias пути, например /uslugi/remont/dverey.
     */
    // public function showByAlias(string $alias): JsonResponse
    // {
    //     try {
    //         // Убираем лишние слэши и разбиваем путь на сегменты
    //         $segments = explode('/', trim($alias, '/'));

    //         // Начинаем поиск с верхнего уровня
    //         $query = Page::with(['parent', 'children'])
    //             ->whereNull('parent_id')
    //             ->where('alias', $segments[0])
    //             ->first();

    //         if (!$query) {
    //             return response()->json([
    //                 'status' => false,
    //                 'message' => 'Page not found',
    //                 'data' => null,
    //             ], 404);
    //         }

    //         $page = $query;

    //         // Проходим по всем сегментам пути, начиная со второго
    //         for ($i = 1; $i < count($segments); $i++) {
    //             $page = $page->children()
    //                 ->where('alias', $segments[$i])
    //                 ->with(['parent', 'children'])
    //                 ->first();

    //             if (!$page) {
    //                 return response()->json([
    //                     'status' => false,
    //                     'message' => 'Page not found for path: ' . implode('/', array_slice($segments, 0, $i + 1)),
    //                     'data' => null,
    //                 ], 404);
    //             }
    //         }

    //         return response()->json([
    //             'status' => true,
    //             'message' => 'Page retrieved successfully',
    //             'data' => new PageResource($page),
    //         ]);
    //     } catch (Exception $e) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Failed to retrieve page: ' . $e->getMessage(),
    //             'data' => null,
    //         ], 500);
    //     }
    // }

    // 🔹 Получение страницы по alias (вложенные alias тоже поддерживаются)
    public function showByAlias(string $alias): JsonResponse
    {
        try {
            // Разбиваем alias на сегменты (например "uslugi/remont")
            $segments = explode('/', trim($alias, '/'));

            $query = Page::query()->whereNull('parent_id');
            $page = null;

            foreach ($segments as $segment) {
                $page = $query->where('alias', $segment)->first();
                if (!$page) break;
                $query = $page->children();
            }

            if (!$page) {
                return response()->json([
                    'status' => false,
                    'message' => 'Page not found',
                    'data' => null,
                ], 404);
            }

            $page->load('children', 'parent');

            return response()->json([
                'status' => true,
                'message' => 'Page retrieved successfully',
                'data' => new PageResource($page),
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve page: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    // 🔹 Меню сайта (только опубликованные страницы, без контента)
    public function menu(): JsonResponse
    {
        try {
            $pages = Page::query()
                ->where('is_published', true)
                ->select('id', 'parent_id', 'page_title as title', 'alias')
                ->orderBy('parent_id')
                ->orderBy('id')
                ->get();

            // Строим древовидное меню
            $tree = $pages->whereNull('parent_id')->map(function ($page) use ($pages) {
                return [
                    'id' => $page->id,
                    'title' => $page->title,
                    'alias' => $page->alias,
                    'children' => $pages->where('parent_id', $page->id)->values(),
                ];
            })->values();

            return response()->json([
                'status' => true,
                'message' => 'Menu generated successfully',
                'data' => $tree,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to build menu: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }


    /**
     * Обновление страницы.
     */
    public function update(UpdatePageRequest $request, Page $page): JsonResponse
    {
        try {
            $page->update($request->validated());
            return response()->json([
                'status' => true,
                'message' => 'Page updated successfully',
                'data' => new PageResource($page->fresh('children')),
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to update page: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Удаление страницы и всех её дочерних страниц.
     */

    public function destroy(Page $page): JsonResponse
    {
        try {
            $page->delete();
            return response()->json([
                'status' => true,
                'message' => 'Page deleted successfully',
                'data' => null,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to delete page: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Генерация полного URL страницы по цепочке parent’ов.
     */

    private function generateFullUrl(Page $page): string
    {
        $segments = [];
        $current = $page;

        while ($current) {
            if ($current->alias) {
                array_unshift($segments, $current->alias);
            }
            $current = $current->parent;
        }

        return '/' . implode('/', $segments);
    }
}
