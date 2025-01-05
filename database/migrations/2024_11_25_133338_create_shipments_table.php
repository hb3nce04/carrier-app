<?php

use App\Models\Address;
use App\Models\Carrier;
use App\Models\StreetSuffix;
use App\Models\User;
use App\Models\Consignee;
use App\Enums\ShipmentStatus;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shipments', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Address::class, 'departure_address_id')->constrained();
            $table->foreignIdFor(Consignee::class)->constrained();
            $table->foreignIdFor(Carrier::class)->constrained();
            $table->enum('status', array_column(ShipmentStatus::cases(), 'value'))->index()->default(ShipmentStatus::ISSUED);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipments');
    }
};
