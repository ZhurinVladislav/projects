<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\PropertyType;
use App\Http\Requests\StorePropertyTypeRequest;
use App\Http\Requests\UpdatePropertyTypeRequest;
use App\Http\Resources\v1\PropertyTypeResource;
use Exception;
use Illuminate\Http\JsonResponse;


class PropertyTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $types = PropertyType::orderBy('title')->get();
            return response()->json([
                'status' => true,
                'message' => 'Property types retrieved successfully',
                'data' => PropertyTypeResource::collection($types),
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve property types: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePropertyTypeRequest $request): JsonResponse
    {
        try {
            $type = PropertyType::create($request->validated());
            return response()->json([
                'status' => true,
                'message' => 'Property type created successfully',
                'data' => new PropertyTypeResource($type),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to create property type: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(PropertyType $propertyType): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => 'Property type retrieved successfully',
            'data' => new PropertyTypeResource($propertyType),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePropertyTypeRequest $request, PropertyType $propertyType): JsonResponse
    {
        try {
            $propertyType->update($request->validated());
            return response()->json([
                'status' => true,
                'message' => 'Property type updated successfully',
                'data' => new PropertyTypeResource($propertyType),
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to update property type: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PropertyType $propertyType): JsonResponse
    {
        try {
            $propertyType->delete();
            return response()->json([
                'status' => true,
                'message' => 'Property type deleted successfully',
                'data' => null,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to delete property type: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
}
