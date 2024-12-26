<?php

namespace App\Http\Controllers;

use App\Http\Requests\VehicleCreateRequest;
use App\Http\Resources\CarrierResource;
use App\Http\Resources\ShipmentResource;
use App\Http\Resources\VehicleResource;
use App\Models\Carrier;
use App\Models\Shipment;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('viewAny', Vehicle::class);

        $user = $request->user();
        $vehicles = Vehicle::all();

        return Inertia::render('Vehicle/Index', [
            "vehicles" => VehicleResource::collection($vehicles),
            "can" => [
                "delete" => $user->can('delete', Vehicle::class),
                "update" => $user->can('update', Vehicle::class),
            ]
        ]);
    }

    public function create(Request $request)
    {
        Gate::authorize('create', Vehicle::class);

        $nonAdminCarriers = Carrier::doesntHave("admin")->doesntHave('vehicle')->get();

        return Inertia::render('Vehicle/Create', [
            "carriers" => CarrierResource::collection($nonAdminCarriers),
        ]);

    }

    public function store(VehicleCreateRequest $request)
    {
        $data = $request->validated();

        $carrier = Carrier::where("id", $data["carrier_id"])->doesntHave("admin")->doesntHave('vehicle')->first();
        if (!$carrier) {
            return abort(400);
        }
        Vehicle::create([
            "model" => $data["model"],
            "brand" => $data["brand"],
            "plate_number" => $data["plate_number"],
            "carrier_id" => $carrier->id,
        ]);

        return redirect()->route('vehicles.index');
    }

    public function show(Request $request, Vehicle $vehicle)
    {
        Gate::authorize('view', $vehicle);

        $user = request()->user();

        return Inertia::render('Vehicle/Show', [
            "vehicle" => new VehicleResource($vehicle),
            "can" => [
                "update" => $user->can("update"),
                "delete" => $user->can("delete", Vehicle::class),
            ]
        ]);
    }

    public function edit(Request $request, Vehicle $vehicle)
    {
        Gate::authorize('update', Vehicle::class);

        $nonAdminCarriers = Carrier::doesntHave("admin")->doesntHave('vehicle')->get();

        return Inertia::render('Vehicle/Edit', [
            "vehicle" => new VehicleResource($vehicle),
            "carriers" => CarrierResource::collection($nonAdminCarriers),
        ]);
    }

    public function destroy(Request $request, Vehicle $vehicle)
    {
        Gate::authorize('delete', Vehicle::class);
        $vehicle->delete();
        return redirect()->route('shipments.index');
    }

}
