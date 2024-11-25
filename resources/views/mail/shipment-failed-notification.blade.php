<x-mail::message>
    # Sikertelen fuvarozás

    Kedves {{ $name }}!

    Az alábbi munka <i>sikertelen</i> státuszú:

    <ul>
        <li>Azonosító: {{ $shipment->id }}</li>
        <li>Indulási cím: {{ $shipment->departure_address }}</li>
        <li>Érkezési cím: {{ $shipment->arrival_address }}</li>
        <li>Címzett neve: {{ $shipment->consignee->last_name }} {{ $shipment->consignee->first_name }}</li>
        <li>Címzett telefonszáma: {{ $shipment->consignee->phone_number }}</li>
        <li>Fuvarozó neve: {{ $shipment->carrier->last_name }} {{ $shipment->carrier->first_name }}</li>
    </ul>

    <x-mail::button :url="url('/shipments/' . $shipment->id)">
        Megtekintés
    </x-mail::button>

    Üdvözlettel,<br>
    {{ config('app.name') }}
</x-mail::message>
