<?php

use App\Models\Carrier;
use App\Models\Consignee;
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
            $table->string("departure_address")->required();
            $table->string("arrival_address")->required();
            $table->foreignIdFor(Consignee::class)->constrained()->required()->onUpdate("cascade")->onDelete("cascade");
            $table->foreignIdFor(Carrier::class)->constrained()->required()->onUpdate("cascade")->onDelete("cascade");
            $table->enum("status", ["issued", "progress", "finished", "failed"])->required()->default("issued");
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
