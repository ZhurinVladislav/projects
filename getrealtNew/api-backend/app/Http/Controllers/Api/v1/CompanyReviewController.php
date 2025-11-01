<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\StoreCompanyReviewRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Http\Resources\v1\CompanyReviewResource;
use Exception;
use Illuminate\Http\JsonResponse;

class CompanyReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Company $company): JsonResponse
    {
        try {
            $reviews = $company->reviews()->latest()->get();

            return response()->json([
                'status' => true,
                'message' => 'Reviews retrieved successfully',
                'data' => CompanyReviewResource::collection($reviews),
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve reviews: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCompanyReviewRequest $request, Company $company): JsonResponse
    {
        try {
            $review = $company->reviews()->create($request->validated());
            $company->recalculateRating();

            return response()->json([
                'status' => true,
                'message' => 'Review added successfully',
                'data' => new CompanyReviewResource($review),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to add review: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
}
