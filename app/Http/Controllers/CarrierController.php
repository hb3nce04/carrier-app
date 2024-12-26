<?php

namespace App\Http\Controllers;

use App\Http\Requests\VehicleCreateRequest;
use App\Http\Resources\CarrierResource;
use App\Http\Resources\VehicleResource;
use App\Models\Carrier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class CarrierController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('viewAny', Carrier::class);

        $carriers = Carrier::all();
        return Inertia::render('Carrier/Index', [
            "carriers" => CarrierResource::collection($carriers)
        ]);
    }

    public function create(Request $request)
    {

    }

    public function store(Request $request)
    {

    }

    public function show(Request $request, Carrier $vehicle)
    {

    }

    public function edit(Request $request, Carrier $vehicle)
    {

    }

    public function destroy(Request $request, Carrier $vehicle)
    {

    }
}
