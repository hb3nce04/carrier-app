<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consignee extends Model
{
    protected $fillable = [
        "first_name",
        "last_name",
        "phone_number"
    ];

    public function shipment()
    {
        return $this->hasMany(Shipment::class);
    }
}
