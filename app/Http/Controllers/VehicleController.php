<?php

namespace App\Http\Controllers;

use App\Http\Resources\VehicleResource;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function index(Request $request)
    {
        $vehicles = Vehicle::all();

        return Inertia::render('Vehicle/Index', [
            "vehicles" => VehicleResource::collection($vehicles),
        ]);
    }

    public function show(Request $request, Vehicle $vehicle)
    {

    }

    public function edit(Request $request, Vehicle $vehicle)
    {

    }

    public function destroy(Request $request, Vehicle $vehicle)
    {
        $vehicle->delete();
    }

}
