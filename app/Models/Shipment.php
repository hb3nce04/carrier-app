<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Shipment extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        "departure_address",
        "arrival_address",
        "consignee_id",
        "carrier_id",
        "status",
    ];

    public function consignee()
    {
        return $this->belongsTo(Consignee::class);
    }

    public function carrier()
    {
        return $this->belongsTo(Carrier::class);
    }
}
