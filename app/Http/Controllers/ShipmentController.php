<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShipmentCreateRequest;
use App\Http\Requests\ShipmentUpdateRequest;
use App\Http\Requests\ShipmentUpdateStatusRequest;
use App\Http\Resources\CarrierResource;
use App\Http\Resources\ShipmentResource;
use App\Models\Carrier;
use App\Models\Consignee;
use App\Notifications\ShipmentFailedNotification;
use App\Enums\ShipmentStatus;
use Gate;
use Inertia\Inertia;
use App\Models\Shipment;
use Illuminate\Http\Request;

class ShipmentController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $query = $user->can("viewAny", Shipment::class) ? Shipment::query() : Shipment::query()->where("carrier_id", $user->id);
        if (request("status") && $user->can("filter", Shipment::class)) {
            $query->where("status", $request->query("status"));
        }
        $shipments = $query->get();

        return Inertia::render('Shipment/Index', [
            "shipments" => ShipmentResource::collection($shipments),
            "queryParams" => request()->query() ?: null,
            "filter" => $user->can("filter", Shipment::class),
            "can" => [
                "create" => $user->can("create", Shipment::class),
                "update" => $user->can("update", Shipment::class),
                "delete" => $user->can("delete", Shipment::class)
            ],
        ]);
    }

    public function create(Request $request)
    {
        Gate::authorize('create', Shipment::class);

        $nonAdminCarriers = Carrier::doesntHave("admin")->get();

        return Inertia::render('Shipment/Create', [
            "carriers" => CarrierResource::collection($nonAdminCarriers),
        ]);

    }

    public function store(ShipmentCreateRequest $request)
    {
        $consignee = Consignee::create([
            "first_name" => $request->consignee_first_name,
            "last_name" => $request->consignee_last_name,
            "phone_number" => $request->consignee_phone_number,
        ]);
        $carrier = Carrier::find($request->carrier_id)->doesntHave("admin")->first();
        if (!$carrier) {
            return abort(400);
        }
        Shipment::create([
            "departure_address" => $request->departure_address,
            "arrival_address" => $request->arrival_address,
            "carrier_id" => $carrier->id,
            "status" => $request->status,
            "consignee_id" => $consignee->id,
        ]);

        return redirect()->route('shipments.index');
    }

    public function show(Request $request, Shipment $shipment)
    {
        Gate::authorize('view', $shipment);

        $user = request()->user();

        return Inertia::render('Shipment/Show', [
            "shipment" => new ShipmentResource($shipment),
            "can" => [
                "update" => $user->can("update", Shipment::class),
                "delete" => $user->can("delete", Shipment::class),
                "changeStatus" => $user->can("changeStatus", $shipment),
            ]
        ]);
    }

    public function edit(Request $request, Shipment $shipment)
    {
        Gate::authorize('update', Shipment::class);

        $nonAdminCarriers = Carrier::doesntHave("admin")->get();

        return Inertia::render('Shipment/Edit', [
            "shipment" => new ShipmentResource($shipment),
            "carriers" => CarrierResource::collection($nonAdminCarriers),
        ]);
    }

    public function update(ShipmentUpdateRequest $request, Shipment $shipment)
    {
        $carrier = Carrier::find($request->carrier_id)->doesntHave("admin")->first();
        if (!$carrier) {
            return abort(400);
        }
        $shipment->consignee()->update([
            "first_name" => $request->consignee_first_name,
            "last_name" => $request->consignee_last_name,
            "phone_number" => $request->consignee_phone_number,
        ]);
        $shipment->update([
            "departure_address" => $request->departure_address,
            "arrival_address" => $request->arrival_address,
            "carrier_id" => $carrier->id,
            "status" => $request->status,
        ]);
        if ($shipment->status === ShipmentStatus::FAILED) {
            $shipment->carrier->notify(new ShipmentFailedNotification($shipment, $request->user()->last_name . " " . $request->user()->first_name));
        }

        return redirect()->route('shipments.index');
    }

    public function changeStatus(ShipmentUpdateStatusRequest $request, Shipment $shipment)
    {
        $shipment->update([
            "status" => $request->status
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
