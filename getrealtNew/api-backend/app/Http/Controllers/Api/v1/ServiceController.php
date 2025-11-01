<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Http\Resources\v1\ServiceResource;
use Illuminate\Http\JsonResponse;
use Exception;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $services = Service::with('categories')->orderBy('id', 'desc')->get();

            return response()->json([
                'status' => true,
                'message' => 'Services retrieved successfully',
                'data' => ServiceResource::collection($services),
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
    public function store(StoreServiceRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();
            $categories = $data['category_ids'] ?? [];
            unset($data['category_ids']);

            $service = Service::create($data);

            if (!empty($categories)) {
                $service->categories()->sync($categories);
            }

            return response()->json([
                'status' => true,
                'message' => 'Service created successfully',
                'data' => new ServiceResource($service->load('categories')),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to create service: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service): JsonResponse
    {
        try {
            $service->load('categories');

            return response()->json([
                'status' => true,
                'message' => 'Service retrieved successfully',
                'data' => new ServiceResource($service),
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve service: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceRequest $request, Service $service): JsonResponse
    {
        try {
            $data = $request->validated();
            $categories = $data['category_ids'] ?? [];
            unset($data['category_ids']);

            $service->update($data);

            if (!empty($categories)) {
                $service->categories()->sync($categories);
            }

            return response()->json([
                'status' => true,
                'message' => 'Service updated successfully',
                'data' => new ServiceResource($service->fresh('categories')),
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to update service: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service): JsonResponse
    {
        try {
            $service->categories()->detach();
            $service->delete();

            return response()->json([
                'status' => true,
                'message' => 'Service deleted successfully',
                'data' => null,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to delete service: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
}
