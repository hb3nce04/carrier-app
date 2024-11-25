<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShipmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "departure_address" => "required|string|min:3|max:255",
            "arrival_address" => "required|string|min:3|max:255",
            "consignee_id" => "required|numeric",
            "carrier_id" => "required|numeric",
            "status" => "required|string|in:pending,progress,failed,completed",
        ];
    }
}
