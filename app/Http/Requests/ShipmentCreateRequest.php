<?php

namespace App\Http\Requests;

use App\Models\Shipment;
use App\Enums\ShipmentStatus;
use Gate;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ShipmentCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('create', Shipment::class);
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
            "consignee_first_name" => "required|string",
            "consignee_last_name" => "required|string",
            "consignee_phone_number" => "required|string",
            "carrier_id" => "numeric",
            "status" => Rule::in(ShipmentStatus::cases()),
        ];
    }
}
