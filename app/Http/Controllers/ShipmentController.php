<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShipmentRequest;
use App\Http\Resources\CarrierResource;
use App\Http\Resources\ShipmentResource;
use App\Models\Carrier;
use App\Models\Consignee;
use App\Notifications\ShipmentFailedNotification;
use App\Notifications\ShipmentNotification;
use Inertia\Inertia;
use App\Models\Shipment;
use Illuminate\Http\Request;

class ShipmentController extends Controller
{
    public function index(Request $request)
    {
        $isAdmin = $request->user()->is_admin;
        if ($isAdmin) {
            $query = Shipment::query();
        } else {
            $query = Shipment::query()->where("carrier_id", $request->user()->id);
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }
        $shipments = $query->paginate(30);
        return Inertia::render('Shipment/Index', [
            "shipments" => ShipmentResource::collection($shipments),
            "queryParams" => request()->query() ?: null,
        ]);
    }

    public function create(Request $request)
    {
        $nonAdminCarriers = Carrier::doesntHave("admin")->get();

        return Inertia::render('Shipment/Create', [
            "carriers" => CarrierResource::collection($nonAdminCarriers),
        ]);

    }

    // TODO doesn't work
    public function store(ShipmentRequest $request)
    {
        $validated = $request->validated();
        $consignee = Consignee::create([
            "first_name" => $validated["consignee_first_name"],
            "last_name" => $validated["consignee_last_name"],
            "phone_number" => $validated["consignee_phone_number"],
        ]);
        Shipment::create([
            "departure_address" => $validated["departure_address"],
            "arrival_address" => $validated["arrival_address"],
            "carrier_id" => $validated["carrier_id"],
            "status" => $validated["status"],
            "consignee_id" => $consignee->id,
        ]);
        return redirect()->route('shipments.index');
    }

    public function show(Request $request, Shipment $shipment)
    {
        return Inertia::render('Shipment/Show', [
            "shipment" => new ShipmentResource($shipment),
        ]);
    }

    public function edit(Request $request, Shipment $shipment)
    {
        $nonAdminCarriers = Carrier::doesntHave("admin")->get();

        return Inertia::render('Shipment/Edit', [
            "shipment" => new ShipmentResource($shipment),
            "carriers" => CarrierResource::collection($nonAdminCarriers),
        ]);
    }

    public function update(ShipmentRequest $request, Shipment $shipment)
    {
        $request->validated();
        $shipment->consignee()->update([
            "first_name" => $request->consignee_first_name,
            "last_name" => $request->consignee_last_name,
            "phone_number" => $request->consignee_phone_number,
        ]);
        $shipment->update([
            "departure_address" => $request->departure_address,
            "arrival_address" => $request->arrival_address,
            "carrier_id" => $request->carrier_id,
            "status" => $request->status,
        ]);
        // Ha a munka sikertelen, értesítjük az adminisztrátort!
        if ($shipment->status === "failed") {
            $shipment->carrier->notify(new ShipmentFailedNotification($shipment, $request->user()->last_name . " " . $request->user()->first_name));
        }

        return redirect()->route('shipments.index');

    }

    public function destroy(Request $request, Shipment $shipment)
    {
        $shipment->delete();
    }
}
