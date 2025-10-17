<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthLoginRequest;
use App\Http\Requests\AuthRegisterRequest;
use App\Http\Resources\AuthResource;
use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(AuthRegisterRequest $request): JsonResponse
    {
        $data = $request->validated();

        if (User::where("email", $data["email"])->count() == 1) {
            throw new HttpResponseException(response([
                [
                    "success" => false,
                    "message" => "User registered failed",
                    "errors" => [
                        "email" => [
                            "Email already registered"
                        ]
                    ]
                ]
            ], 400));
        }

        $user = new User($data);
        $user->password = Hash::make($data["password"]);
        $user->save();

        return (new AuthResource($user, true, "User registered successfully"))->response()->setStatusCode(201);
    }

    public function login(AuthLoginRequest $request): JsonResponse
    {
        $data = $request->validated();

        $user = User::where('email', $data["email"])->first();

        if (!$user || !Hash::check($data["password"], $user->password)) {
            throw new HttpResponseException(response([
                [
                    "success" => false,
                    "message" => "User login failed",
                    "errors" => [
                        "Email or Password wrong!"
                    ]
                ]
            ], 401));
        }

        $user->token = JWTAuth::fromUser($user);

        return (new AuthResource($user, true, "User login successfully"))->response()->setStatusCode(200);
    }


    public function logout()
    {
        $removeToken = JWTAuth::invalidate(JWTAuth::getToken());
        
        if ($removeToken) {
            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully'
            ], 200);
        }
    }

    public function me()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
    
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found',
                ], 404);
            }
    
            return response()->json([
                'success' => true,
                'message' => 'Get session successfully',
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
            ], 200);
    
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 401);
        }
    }
}
