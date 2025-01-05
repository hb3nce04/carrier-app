<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\User;
use App\Models\Shipment;
use App\Enums\ShipmentStatus;
use Illuminate\Auth\Access\HandlesAuthorization;

class ShipmentPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Shipment $shipment): bool
    {
        return $user->role === UserRole::ADMIN->value || $user->carrier->id === $shipment->carrier_id;
    }

    public function create(User $user): bool
    {
        return $user->role === UserRole::ADMIN->value;
    }

    public function update(User $user): bool
    {
        return $user->role === UserRole::ADMIN->value;
    }

    public function delete(User $user): bool
    {
        return $user->role === UserRole::ADMIN->value;
    }

    public function filter(User $user): bool
    {
        return $user->role === UserRole::ADMIN->value;
    }

    public function changeStatus(User $user, Shipment $shipment): bool
    {
        return $this->view($user, $shipment) && !in_array($shipment->status, [ShipmentStatus::FINISHED->value, ShipmentStatus::FAILED->value]);
    }
}
