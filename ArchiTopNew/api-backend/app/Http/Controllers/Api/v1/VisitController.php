<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVisitRequest;
use App\Http\Resources\v1\VisitResource;
use App\Models\Visit;
use Exception;
use Illuminate\Http\JsonResponse;

class VisitController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVisitRequest $request): JsonResponse
    {
        try {
            // Берем из запроса, иначе fallback
            $ip = $request->input('ip', $request->ip());
            $ua = $request->input('user_agent', $request->userAgent());

            // Проверяем уникальность визита за сутки
            $exists = Visit::where('ip', $ip)
                ->where('user_agent', $ua)
                ->whereDate('created_at', now()->toDateString())
                ->exists();

            if ($exists) {
                return response()->json([
                    'status'  => true,
                    'message' => 'Visit already counted today',
                    'data'    => null,
                ]);
            }

            // Создаем запись
            $visit = Visit::create([
                'ip'         => $ip,
                'user_agent' => $ua,
            ]);

            return response()->json([
                'status'  => true,
                'message' => 'Visit stored successfully',
                'data'    => new VisitResource($visit),
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status'  => false,
                'message' => 'Failed to store visit: ' . $e->getMessage(),
                'data'    => null,
            ], 500);
        }
    }

    /**
     * Статистика уникальных посетителей за последние 30 дней.
     */
    public function monthly(): JsonResponse
    {
        try {
            $uniqueVisitors = Visit::where('created_at', '>=', now()->subDays(30))
                ->distinct(['ip', 'user_agent'])
                ->count();

            return response()->json([
                'status'  => true,
                'message' => 'Monthly stats loaded',
                'data'    => [
                    'unique_visitors' => $uniqueVisitors,
                ],
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status'  => false,
                'message' => 'Failed to load stats: ' . $e->getMessage(),
                'data'    => null,
            ], 500);
        }
    }
}
