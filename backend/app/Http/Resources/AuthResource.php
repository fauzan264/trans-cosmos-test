<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthResource extends JsonResource
{
    private bool $success;
    private ?string $message;

    public function __construct($resource, bool $success = true, ?string $message = null)
    {
        parent::__construct($resource);
        $this->success = $success;
        $this->message = $message;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'success' => $this->success,
            'message' => $this->message ?? 'Success',
            'data' => [
                'id' => $request->id,
                'name' => $request->name,
                'email' => $request->email,
                'role' => $request->role,
                'token' => $this->whenNotNull($this->token)
            ]
        ];
    }
}
