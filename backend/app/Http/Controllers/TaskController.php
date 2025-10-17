<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskStoreRequest;
use App\Http\Requests\TaskUpdateRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    public function index(): JsonResponse {
        $tasks = Task::all();

        return response()->json([
            'success' => true,
            'message' => 'Tasks retrieved successfully',
            'data' => $tasks
        ], 200);
    }

    public function store(TaskStoreRequest $request): JsonResponse {
        $data = $request->validated();
        
        if (Task::where("title", $data["title"])->where("assigned_user_id", $data["assigned_user_id"])->count() == 1) {
            throw new HttpResponseException(response([
                [
                    "success" => false,
                    "message" => "Task creation failed",
                    "errors" => [
                        "title" => [
                            "Task with this title already assigned to this user"
                        ]
                    ]
                ]
            ], 400));
        }

        $data['created_by'] = auth('api')->user()->id;;
    
        $task = new Task($data);
        $task->save();
    
        return (new TaskResource($task, true, "Task created successfully"))->response()->setStatusCode(201);
    }

    public function update(TaskUpdateRequest $request, $id): JsonResponse {
        $task = Task::findOrFail($id);
        $data = $request->validated();
    
        if (Task::where("title", $data["title"])
            ->where("assigned_user_id", $data["assigned_user_id"])
            ->where("id", "!=", $task->id)
            ->count() == 1) {
            throw new HttpResponseException(response([
                [
                    "success" => false,
                    "message" => "Task update failed",
                    "errors" => [
                        "title" => [
                            "Task with this title already assigned to this user"
                        ]
                    ]
                ]
            ], 400));
        }
    
        $task->update($data);
    
        return response()->json([
            'success' => true,
            'message' => 'Task updated successfully',
            'data' => [
                'id' => $task->id,
                'title' => $task->title,
                'description' => $task->description,
                'status' => $task->status,
                'priority' => $task->priority,
                'assigned_user_id' => $task->assigned_user_id,
                'due_date' => $task->due_date,
            ]
        ], 200);
    }

    public function destroy($id): JsonResponse {
        $task = Task::findOrFail($id);
        $task->delete();
    
        return response()->json([
            'success' => true,
            'message' => 'Task deleted successfully',
            'data' => []
        ], 200);
    }

    // public function uploadAttachment(): JsonResponse {

    // }
}
