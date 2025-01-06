<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Carrier extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name'
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the shipments for the carrier.
     */
    public function shipments(): HasMany
    {
        return $this->hasMany(Shipment::class);
    }

    public function vehicle()
    {
        return $this->hasOne(Vehicle::class);
    }

    public function getFullName(): string {
        return "$this->last_name $this->first_name";
    }
}
