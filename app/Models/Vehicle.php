<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        "brand",
        "model",
        "plate_number",
        "carrier_id"
    ];

    public function carrier()
    {
        return $this->belongsTo(Carrier::class);
    }
}
