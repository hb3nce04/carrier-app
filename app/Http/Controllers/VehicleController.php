<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Enums\ShipmentStatus;
use App\Http\Requests\ShipmentRequest;
use App\Http\Requests\VehicleRequest;
use App\Http\Resources\CarrierResource;
use App\Http\Resources\ShipmentResource;
use App\Http\Resources\VehicleResource;
use App\Models\Carrier;
use App\Models\Shipment;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

// TODO: make queries easier through ORM
class VehicleController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('viewAny', Vehicle::class);

        $user = $request->user();
        $vehicles = Vehicle::all();

        return Inertia::render('Vehicle/Index', [
            'vehicles' => VehicleResource::collection($vehicles),
            'can' => [
                'create' => $user->can('create', Vehicle::class),
                'update' => $user->can('update', Vehicle::class),
                'delete' => $user->can('delete', Vehicle::class),
            ]
        ]);
    }

    public function create(Request $request)
    {
        Gate::authorize('create', Vehicle::class);

        $carriers = Carrier::doesntHave('vehicle')->get();

        return Inertia::render('Vehicle/Create', [
            'carriers' => CarrierResource::collection($carriers),
        ]);

    }

    public function store(VehicleRequest $request)
    {
        Gate::authorize('create', Vehicle::class);

        $validated = $request->validated();

        $carrier = Carrier::where('id', $validated['carrier_id'])->doesntHave('vehicle')->first();
        if (!$carrier) return abort(400);
        Vehicle::create($validated);

        return redirect()->route('vehicles.index');
    }

    public function show(Request $request, Vehicle $vehicle)
    {
        Gate::authorize('view', $vehicle);

        $user = request()->user();

        return Inertia::render('Vehicle/Show', [
            'vehicle' => new VehicleResource($vehicle),
            'can' => [
                'update' => $user->can('update'),
                'delete' => $user->can('delete', Vehicle::class),
            ]
        ]);
    }

    public function edit(Request $request, Vehicle $vehicle)
    {
        Gate::authorize('update', Vehicle::class);

        $currentCarrier = Carrier::where('id', $vehicle->carrier->id)->get();
        $carriersWithoutVehicle = Carrier::doesntHave('vehicle')->get();
        $carriers = $currentCarrier->merge($carriersWithoutVehicle);

        return Inertia::render('Vehicle/Edit', [
            'vehicle' => new VehicleResource($vehicle),
            'carriers' => CarrierResource::collection($carriers),
        ]);
    }

    public function update(VehicleRequest $request, Vehicle $vehicle)
    {
        Gate::authorize('update', Vehicle::class);

        $validated = $request->validated();
        $user = $request->user();

        $carrier = Carrier::where('id', $validated['carrier_id'])->doesntHave('vehicle')->first();
        if (!$carrier && $validated['carrier_id'] !== $vehicle->carrier_id) return abort(400);

        $vehicle->update($validated);

        return redirect()->route('vehicles.index');
    }

    public function destroy(Request $request, Vehicle $vehicle)
    {
        Gate::authorize('delete', Vehicle::class);
        $vehicle->delete();
        return redirect()->route('vehicles.index');
    }

}
