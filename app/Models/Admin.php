<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Admin extends Model
{
    use HasFactory;

    protected $fillable = [
        "nickname",
    ];

    /**
     * Get the carrier associated with the admin.
     */
    public function carrier()
    {
        return $this->belongsTo(Carrier::class);
    }
}
