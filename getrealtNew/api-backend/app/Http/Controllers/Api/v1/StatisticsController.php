<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\CompanyReview;
use App\Models\Service;
use App\Models\Visit;
use Illuminate\Http\JsonResponse;
// use App\Services\StatisticsService;
use Exception;

class StatisticsController extends Controller
{
    // protected $statsService;

    // public function __construct(StatisticsService $statsService)
    // {
    //     $this->statsService = $statsService;
    // }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            // Получаем данные статистики
            $statistics = [
                'companies' => Company::count(),
                'services' => Service::count(),
                'reviews'  => CompanyReview::count(),
                'visitors'  => Visit::where('created_at', '>=', now()->subDays(30))
                    ->distinct(['ip', 'user_agent'])
                    ->count(),
            ];

            return response()->json([
                'status'  => true,
                'message' => 'Statistics retrieved successfully',
                'data'    => $statistics,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status'  => false,
                'message' => 'Failed to retrieve statistics: ' . $e->getMessage(),
                'data'    => null,
            ], 500);
        }
    }
}
