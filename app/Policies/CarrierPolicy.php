<?php

namespace App\Policies;

use App\Models\Carrier;
use App\Models\Vehicle;

class CarrierPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(Carrier $carrier): bool
    {
        return $carrier->is_admin;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(Carrier $carrier, Vehicle $vehicle): bool
    {
        return $carrier->is_admin;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(Carrier $carrier): bool
    {
        return $carrier->is_admin;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Carrier $carrier): bool
    {
        return $carrier->is_admin;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Carrier $carrier): bool
    {
        return $carrier->is_admin;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Carrier $carrier, Vehicle $vehicle): bool
    {
        return $carrier->is_admin;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Carrier $carrier, Vehicle $vehicle): bool
    {
        return $carrier->is_admin;
    }
}
