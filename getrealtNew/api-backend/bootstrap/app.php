<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use App\Http\Middleware\CheckFrontendToken;
use App\Http\Middleware\IsAdmin;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => 'Not found.'
                ], 404);
            }
        });
    })
    ->withMiddleware(function (Middleware $middleware): void {
        // ✅ Алиасы для использования в роутерах
        $middleware->alias([
            'frontend' => CheckFrontendToken::class,
            'isAdmin' => IsAdmin::class,
        ]);

        // ✅ Группы middleware (если нужно)
        $middleware->group('frontend', [
            CheckFrontendToken::class,
        ]);

        $middleware->group('admin', [
            IsAdmin::class,
        ]);
    })
    ->create();
