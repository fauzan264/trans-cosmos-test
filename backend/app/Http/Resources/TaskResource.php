<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
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
                'title' => $request->title,
                'description' => $request->description,
                'status' => $request->status,
                'priority' => $request->priority,
                'assigned_user_id' => $request->assigned_user_id,
                'due_date' => $request->due_date,
            ]
        ];
    }
}
