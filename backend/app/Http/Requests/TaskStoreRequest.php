<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class TaskStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "title"             => ["required", "max:255"],
            "description"       => ["nullable", "max:1000"],
            "status"            => ["required", "in:pending,in_progress,completed"],
            "priority"          => ["required", "in:low,medium,high"],
            "assigned_user_id"  => ["required", "exists:users,id"],
            "due_date"          => ["nullable", "date"]
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response([
            "success"   => false,
            "message"   => "Task creation failed",
            "errors"    => $validator->getMessageBag()
        ], 400));
    }
}
