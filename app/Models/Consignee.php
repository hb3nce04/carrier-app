<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consignee extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'address_id',
        'phone_number'
    ];

    /**
     * Summary of shipment
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function shipment()
    {
        return $this->hasMany(Shipment::class);
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function getFullName(): string {
        return "$this->last_name $this->first_name";
    }
}
