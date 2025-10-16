<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::prefix('/api/auth')->group(function () {
    // Route::post('/login' );
    // Route::post('/logout', );
    // Route::post('/me', );
});

Route::prefix('/api/task')->group(function () {
    // Route::get('/', );
    // Route::post('/', );
    // Route::put('/{id}', );
    // Route::delete('/{id}', );
    // Route::post('/{id}/attachments', );
});

Route::prefix('/api/attachments')->group(function () {
    // Route::get('/', );
    // Route::delete('/{id}, );
});