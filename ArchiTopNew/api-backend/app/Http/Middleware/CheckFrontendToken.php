<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckFrontendToken
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->header('X-Frontend-Token');

        if ($token !== config('app.frontend_api_token')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
