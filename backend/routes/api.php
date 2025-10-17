<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::prefix('/auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    
    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });
});

Route::middleware("auth:api")->prefix('/tasks')->group(function () {
    Route::get('/', [TaskController::class, "index"]);
    Route::post('/', [TaskController::class, "store"]);
    Route::put('/{id}', [TaskController::class, "update"]);
    Route::delete('/{id}', [TaskController::class, "destroy"]);
    // Route::post('/{id}/attachments', [TaskController::class, "uploadAttachment"]);
});

Route::middleware("auth:api")->prefix('/attachments')->group(function () {
    // Route::get('/', );
    // Route::delete('/{id}, );
});