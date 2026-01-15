<?php

use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\CompanyController;
use App\Http\Controllers\Api\v1\PageController;
use App\Http\Controllers\Api\v1\PostController;
use App\Http\Controllers\Api\v1\PropertyTypeController;
use App\Http\Controllers\Api\v1\ServiceCategoryController;
use App\Http\Controllers\Api\v1\ServiceController;
use App\Http\Controllers\Api\v1\StatisticsController;
use App\Http\Controllers\Api\v1\VisitController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Публичные маршруты (frontend токен)
Route::prefix('v1')->middleware(['throttle:api', 'frontend'])->group(function () {
    // user
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // pages
    Route::apiResource('/pages', PageController::class)->only(['index', 'show']);
    Route::get('/pages-simple', [PageController::class, 'listSimple']);
    Route::get('/pages/alias/{alias}', [PageController::class, 'showByAlias'])
        ->where('alias', '.*') // ← важно! чтобы принимать слэши в пути
        ->name('pages.showByAlias');
    Route::get('/pages-menu', [PageController::class, 'menu']);

    // services
    Route::apiResource('/service-categories', ServiceCategoryController::class)->only(['index', 'show']);
    Route::get('service-categories/page/{id}/', [ServiceCategoryController::class, 'servicesByPage'])
        ->name('service-categories.services-by-page');
    Route::apiResource('/services', ServiceController::class)->only(['index', 'show']);

    // companies
    Route::get('/companies/by-page/{pageId?}', [CompanyController::class, 'companiesByPage'])
        ->name('companies.by-page');
    Route::apiResource('/companies', CompanyController::class)->only(['index', 'show']);
    Route::get('/companies/by-category/{serviceCategoryId}', [CompanyController::class, 'getByServiceCategory'])
        ->name('companies.by-category');

    // Route::get('/companies/by-page/{pageId?}', [CompanyController::class, 'companiesByPage'])
    //     ->name('companies.by-page');


    Route::get('/companies/page/{pageId}', [CompanyController::class, 'companyByPage'])->name('companies.page');

    // posts
    Route::apiResource('/posts', PostController::class)->only(['store', 'update', 'destroy']);

    // statistics
    Route::apiResource('/statistics', StatisticsController::class)->only(['index']);

    // visits
    Route::apiResource('/visits', VisitController::class)->only(['store']);
    Route::apiResource('/visits/monthly', VisitController::class)->only(['monthly']);
});

// Авторизованные пользователи (Sanctum)
Route::prefix('v1')->middleware(['throttle:api', 'frontend', 'auth:sanctum'])->group(function () {
    // user
    Route::get('/user', fn(Request $request) => $request->user());
    Route::get('/user/profile', [AuthController::class, 'profile']);
    Route::put('/user/update', [AuthController::class, 'update']);
    Route::get('/logout', [AuthController::class, 'logout']);

    // pages
    Route::apiResource('/pages', PageController::class);
    Route::get('/pages-simple', [PageController::class, 'listSimple']);

    // companies
    Route::apiResource('property-types', PropertyTypeController::class);
    // Route::apiResource('companies', CompanyController::class);
    Route::apiResource('/companies', CompanyController::class)->only(['store', 'destroy']);
    Route::post('/companies/{company}', [CompanyController::class, 'update']);
    Route::post('companies/{company}/attach-property-types', [CompanyController::class, 'attachPropertyTypes']);

    // services
    Route::apiResource('/service-categories', ServiceCategoryController::class)->only(['store', 'destroy']);
    Route::apiResource('/services', ServiceController::class)->only(['store', 'update', 'destroy']);

    // posts
    Route::apiResource('/posts', PostController::class);
});
