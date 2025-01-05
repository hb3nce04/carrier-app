<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Http\Requests\ShipmentRequest;
use App\Http\Requests\ShipmentUpdateStatusRequest;
use App\Http\Resources\CarrierResource;
use App\Http\Resources\ConsigneeResource;
use App\Http\Resources\ShipmentResource;
use App\Models\Carrier;
use App\Models\Consignee;
use App\Models\StreetSuffix;
use App\Notifications\ShipmentFailedNotification;
use App\Enums\ShipmentStatus;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use App\Models\Shipment;
use Illuminate\Http\Request;

class ShipmentController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('viewAny', Shipment::class);

        $user = $request->user();
        $status = $request->query('status');

        $query = $user->can('viewAny', Shipment::class) ? Shipment::query() : Shipment::query()->where('carrier_id', $user->id);
        if ($status && $user->can('filter', Shipment::class)) {
            $query->where('status', $status);
        }
        $shipments = $query->paginate(perPage: 10);

        return Inertia::render('Shipment/Index', [
            'shipments' => ShipmentResource::collection($shipments),
            'queryParams' => ['status' => $status],
            'can' => [
                'filter' => $user->can('filter', Shipment::class),
                'create' => $user->can('create', Shipment::class),
                'update' => $user->can('update', Shipment::class),
                'delete' => $user->can('delete', Shipment::class)
            ],
        ]);
    }

    public function create(Request $request)
    {
        Gate::authorize('create', Shipment::class);

        $carriers = Carrier::all();
        $streetSuffixes = StreetSuffix::all();
        $consignees = Consignee::all();

        return Inertia::render('Shipment/Create', [
            'carriers' => CarrierResource::collection($carriers),
            'streetSuffixes' => $streetSuffixes,
            'consignees' => $consignees
        ]);

    }

    public function store(ShipmentRequest $request)
    {
        Gate::authorize('create', Shipment::class);

        $validated = $request->validated();

        $consignee = Consignee::create([
            'postal' => $validated['consignee_postal'],
            'city' => $validated['consignee_city'],
            'street_name' => $validated['consignee_street_name'],
            'street_suffix' => $validated['consignee_street_suffix'],
            'street_number' => $validated['consignee_street_number'],
            'first_name' => $validated['consignee_first_name'],
            'last_name' => $validated['consignee_last_name'],
            'phone_number' => $validated['consignee_phone_number'],
        ]);
        $carrier = Carrier::where('id', $validated['carrier_id'])->first();
        if (!$carrier) return abort(400);
        Shipment::create([
            'departure_postal' => $validated['departure_postal'],
            'departure_city' => $validated['departure_city'],
            'departure_street_name' => $validated['departure_street_name'],
            'departure_street_suffix' => $validated['departure_street_suffix'],
            'departure_street_number' => $validated['departure_street_number'],
            'carrier_id' => $carrier->id,
            'consignee_id' => $consignee->id,
            'status' => $validated['status'],
        ]);

        return redirect()->route('shipments.index');
    }

    public function show(Request $request, Shipment $shipment)
    {
        Gate::authorize('view', $shipment);

        $user = request()->user();

        return Inertia::render('Shipment/Show', [
            'shipment' => new ShipmentResource($shipment),
            'can' => [
                'update' => $user->can('update', Shipment::class),
                'delete' => $user->can('delete', Shipment::class),
                'changeStatus' => $user->can('changeStatus', $shipment),
            ]
        ]);
    }

    public function edit(Request $request, Shipment $shipment)
    {
        Gate::authorize('update', Shipment::class);

        $carriers = Carrier::all();
        $streetSuffixes = StreetSuffix::all();
        $consignees = Consignee::all();

        return Inertia::render('Shipment/Edit', [
            'shipment' => new ShipmentResource($shipment),
            'carriers' => CarrierResource::collection($carriers),
            'streetSuffixes' => $streetSuffixes,
            'consignees' => ConsigneeResource::collection($consignees)
        ]);
    }

    public function update(ShipmentRequest $request, Shipment $shipment)
    {
        Gate::authorize('update', Shipment::class);

        $validated = $request->validated();
        $user = $request->user();

        $carrier = Carrier::where('id', $validated['carrier_id'])->first();
        if (!$carrier) return abort(400);
        $shipment->consignee()->update([
            'postal' => $validated['consignee_postal'],
            'city' => $validated['consignee_city'],
            'street_name' => $validated['consignee_street_name'],
            'street_suffix' => $validated['consignee_street_suffix'],
            'street_number' => $validated['consignee_street_number'],
            'first_name' => $validated['consignee_first_name'],
            'last_name' => $validated['consignee_last_name'],
            'phone_number' => $validated['consignee_phone_number'],
        ]);
        $shipment->update([
            'departure_postal' => $validated['departure_postal'],
            'departure_city' => $validated['departure_city'],
            'departure_street_name' => $validated['departure_street_name'],
            'departure_street_suffix' => $validated['departure_street_suffix'],
            'departure_street_number' => $validated['departure_street_number'],
            'carrier_id' => $carrier->id,
            'status' => $validated['status'],
        ]);
        if ($shipment->status === ShipmentStatus::FAILED && $user->role !== UserRole::ADMIN->value) {
            // TODO
            //$shipment->carrier->notify(new ShipmentFailedNotification($shipment, $user->last_name . ' ' . $user->first_name));
        }

        return redirect()->route('shipments.index');
    }

    public function changeStatus(ShipmentUpdateStatusRequest $request, Shipment $shipment)
    {
        $data = $request->validated();

        $shipment->update([
            'status' => $data['status'],
        ]);

        return redirect()->route('shipments.show', $shipment);
    }

    public function destroy(Request $request, Shipment $shipment)
    {
        Gate::authorize('delete', Shipment::class);

        $shipment->delete();

        return redirect()->route('shipments.index');
    }
}
