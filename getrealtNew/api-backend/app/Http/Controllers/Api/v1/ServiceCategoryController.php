<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\ServiceCategory;
use App\Http\Requests\StoreServiceCategoryRequest;
use App\Http\Requests\UpdateServiceCategoryRequest;
use App\Http\Resources\v1\ServiceCategoryResource;
use App\Http\Resources\v1\ServiceResource;
use Exception;
use Illuminate\Http\JsonResponse;

class ServiceCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $categories = ServiceCategory::with('page')->orderBy('sort_order')->get();
            return response()->json([
                'status' => true,
                'message' => 'Categories retrieved successfully',
                'data' => ServiceCategoryResource::collection($categories),
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve categories: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    // /**
    //  * Получить все услуги, связанные с категорией.
    //  */
    // public function services(ServiceCategory $serviceCategory): JsonResponse
    // {
    //     try {
    //         // Подгружаем связанные услуги
    //         $serviceCategory->load(['services']);

    //         return response()->json([
    //             'status' => true,
    //             'message' => 'Services retrieved successfully',
    //             // 'data' => [
    //             //     'category' => new ServiceCategoryResource($serviceCategory),
    //             //     'services' => ServiceResource::collection($serviceCategory->services),
    //             // ],
    //             'data' => ServiceResource::collection($serviceCategory->services)
    //         ]);
    //     } catch (Exception $e) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Failed to retrieve services: ' . $e->getMessage(),
    //             'data' => null,
    //         ], 500);
    //     }
    // }
    /**
     * 🔍 Получить категорию и её услуги по page_id.
     *
     * Пример:
     * GET /api/v1/service-categories/page/12/services
     */
    public function servicesByPage(int $id): JsonResponse
    {
        try {
            // Находим категорию, связанную с этой страницей
            $category = ServiceCategory::with(['page', 'services'])
                ->where('page_id', $id)
                ->first();

            if (!$category) {
                return response()->json([
                    'status' => false,
                    'message' => 'Category not found for this page.',
                    'data' => null,
                ], 404);
            }

            // return response()->json([
            //     'status' => true,
            //     'message' => 'Category and services retrieved successfully',
            //     'data' => new ServiceCategoryResource($category),
            //     'services' => ServiceResource::collection($category->services),
            // ]);
            return response()->json([
                'status' => true,
                'message' => 'Category and services retrieved successfully',
                'data' => ServiceResource::collection($category->services),
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve services: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceCategoryRequest $request): JsonResponse
    {
        try {
            $category = ServiceCategory::create($request->validated());
            return response()->json([
                'status' => true,
                'message' => 'Category created successfully',
                'data' => new ServiceCategoryResource($category->load('page')),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to create category: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ServiceCategory $serviceCategory): JsonResponse
    {
        try {
            $serviceCategory->load('page');
            return response()->json([
                'status' => true,
                'message' => 'Category retrieved successfully',
                'data' => new ServiceCategoryResource($serviceCategory),
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve category: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceCategoryRequest $request, ServiceCategory $serviceCategory): JsonResponse
    {
        try {
            $serviceCategory->update($request->validated());
            return response()->json([
                'status' => true,
                'message' => 'Category updated successfully',
                'data' => new ServiceCategoryResource($serviceCategory->fresh('page')),
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to update category: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ServiceCategory $serviceCategory): JsonResponse
    {
        try {
            $serviceCategory->delete();
            return response()->json([
                'status' => true,
                'message' => 'Category deleted successfully',
                'data' => null,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to delete category: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
}
