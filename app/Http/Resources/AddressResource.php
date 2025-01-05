<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'full_address' => $this->getFullAddress(),
            'postal' => $this->postal,
            'city' => $this->city,
            'street_name' => $this->street_name,
            'street_suffix' => [
                'id' => $this->streetSuffix->id,
                'name' => $this->streetSuffix->name
            ],
            'number' => $this->number
        ];
    }
}
