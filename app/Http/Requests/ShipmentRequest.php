<?php

namespace App\Http\Requests;

use App\Enums\ShipmentStatus;
use App\Models\Carrier;
use App\Models\StreetSuffix;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ShipmentRequest extends FormRequest
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
            'departure_postal' => 'required|numeric|min:1000|max:9999',
            'departure_city' => 'required|string|max:50',
            'departure_street_name' => 'required|string|max:20',
            'departure_street_suffix_id' => 'required|numeric|exists:street_suffixes,id',
            'departure_street_number' => 'required|string|max:20',
            'consignee_first_name' => 'required|string|max:50',
            'consignee_last_name' => 'required|string|max:50',
            'consignee_phone_number' => 'required|string|max:15',
            'consignee_id' => 'required|numeric|exists:consignees,id', // TODO
            'consignee_postal' => 'required|numeric',
            'consignee_city' => 'required|string|max:50',
            'consignee_street_name' => 'required|string|max:20',
            'consignee_street_suffix_id' => 'required|numeric|exists:street_suffixes,id',
            'consignee_street_number' => 'required|string|max:20',
            'carrier_id' => 'required|numeric|exists:carriers,id',
            'status' => Rule::in(ShipmentStatus::cases()),
        ];
    }
}
