<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Carrier extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;



    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'email_verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['is_admin', "nickname"];

    /**
     * Get the shipments for the carrier.
     */
    public function shipments(): HasMany
    {
        return $this->hasMany(Shipment::class);
    }

    /**
     * Get the admin record associated with the carrier.
     */
    public function admin(): HasOne
    {
        return $this->hasOne(Admin::class);
    }

    public function vehicle()
    {
        return $this->hasOne(Vehicle::class);
    }

    public function getFullName(): string {
        return "$this->first_name $this->last_name";
    }

    /**
     * Determine if the carrier is an administrator or not.
     */
    protected function isAdmin(): Attribute
    {
        return new Attribute(
            get: fn() => $this->admin()->exists(),
        );
    }

    /**
     * If the carrier is admin, get the nickname
     */
    public function getNicknameAttribute(): string|null
    {
        return $this->isAdmin ? $this->admin->nickname : null;
    }
}
