<?php

namespace App\Policies;

use App\Models\Carrier;
use App\Models\Shipment;
use App\Enums\ShipmentStatus;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ShipmentPolicy
{
    use HandlesAuthorization;

    public function viewAny(Carrier $carrier): bool
    {
        return $carrier->is_admin;
    }

    public function view(Carrier $carrier, Shipment $shipment): bool
    {
        return $this->viewAny($carrier) || $carrier->id === $shipment->carrier_id;
    }

    public function create(Carrier $carrier): bool
    {
        return $carrier->is_admin;
    }

    public function update(Carrier $carrier): bool
    {
        return $carrier->is_admin;
    }

    public function delete(Carrier $carrier): bool
    {
        return $carrier->is_admin;
    }

    public function filter(Carrier $carrier): bool
    {
        return $carrier->is_admin;
    }

    public function changeStatus(Carrier $carrier, Shipment $shipment): bool
    {
        return $this->view($carrier, $shipment) && !in_array($shipment->status, [ShipmentStatus::FINISHED->value, ShipmentStatus::FAILED->value]);
    }
}
