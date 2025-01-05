<?php

namespace App\Http\Controllers;

use App\Http\Resources\CarrierResource;
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
            'carriers' => CarrierResource::collection($carriers)
        ]);
    }

    public function create(Request $request)
    {

    }

    public function store(Request $request)
    {

    }

    public function show(Request $request, Carrier $carrier)
    {

    }

    public function edit(Request $request, Carrier $carrier)
    {

    }

    public function update(Request $request, Carrier $carrier)
    {

    }

    public function destroy(Request $request, Carrier $carrier)
    {

    }
}
