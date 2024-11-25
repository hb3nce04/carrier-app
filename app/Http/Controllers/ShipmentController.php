<?php

namespace App\Http\Controllers;

use App\Http\Resources\ShipmentResource;
use Inertia\Inertia;
use App\Models\Shipment;
use Illuminate\Http\Request;

class ShipmentController extends Controller
{
    public function index(Request $request)
    {
        $shipments = Shipment::all();
        return Inertia::render('Shipment/Index', [
            "shipments" => ShipmentResource::collection($shipments),
        ]);
    }

    public function create(Request $request)
    {


    }

    public function store(Request $request)
    {

    }

    public function show(Request $request)
    {

    }

    public function edit(Request $request)
    {

    }

    public function update(Request $request)
    {

    }

    public function destroy(Request $request)
    {

    }
}
