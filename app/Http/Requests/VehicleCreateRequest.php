<?php

namespace App\Http\Requests;

use App\Models\Vehicle;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class VehicleCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('create', Vehicle::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "brand" => "required|string|min:2|max:50",
            "model" => "required|string|min:1|max:50",
            "plate_number" => "required|string|min:10|max:10",
            "carrier_id" => "required|numeric|unique:vehicles",
        ];
    }
}
