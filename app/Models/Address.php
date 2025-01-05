<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'postal',
        'city',
        'street_name',
        'street_suffix_id',
        'number'
    ];

    protected $with = ['streetSuffix'];

    public function streetSuffix()
    {
        return $this->belongsTo(StreetSuffix::class);
    }

    public function shipment()
    {
        return $this->hasOne(Shipment::class);
    }

    public function consignee()
    {
        return $this->hasOne(Consignee::class);
    }

    public function getFullAddress(): string {
        $suffix = $this->streetSuffix->name;
        return "$this->postal $this->city $this->street_name $suffix $this->number";
    }
}
