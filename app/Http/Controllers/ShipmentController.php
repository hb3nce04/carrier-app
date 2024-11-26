<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShipmentRequest;
use App\Http\Resources\CarrierResource;
use App\Http\Resources\ShipmentResource;
use App\Models\Carrier;
use App\Models\Consignee;
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
        $shipments = $query->paginate(30);
        return Inertia::render('Shipment/Index', [
            "shipments" => ShipmentResource::collection($shipments),
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
        dd($request);

        $request->validated();
        $consignee = Consignee::create([
            "first_name" => $request->consignee_first_name,
            "last_name" => $request->consignee_last_name,
            "phone_number" => $request->consignee_phone_number,
        ]);
        Shipment::create([
            "departure_address" => $request->departure_address,
            "arrival_address" => $request->arrival_address,
            "carrier_id" => $request->carrier_id,
            "status" => $request->status,
            "consignee_id" => $consignee->id,
        ]);
        return redirect()->route('shipments.index');
    }

    public function show(Request $request)
    {

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
        return redirect()->route('shipments.index');

    }

    public function destroy(Request $request, Shipment $shipment)
    {
        $shipment->delete();
    }
}
