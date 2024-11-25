<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShipmentResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request)
    {
        return [
            "id" => $this->id,
            "departure_address" => $this->departure_address,
            "arrival_address" => $this->arrival_address,
            "consignee" => new ConsigneeResource($this->consignee),
            "carrier_name" => (new CarrierResource($this->carrier))->name,
            "status" => $this->status,
        ];
    }
}
