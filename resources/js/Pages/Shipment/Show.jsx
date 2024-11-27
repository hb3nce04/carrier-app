import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

import SecondaryButton from "@/Components/SecondaryButton";
import { SHIPMENT_STATUS } from "@/consts";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function Edit({ shipment }) {
    return (
        <AuthenticatedLayout>
            <Head title={`Munka #${shipment.id}`} />

            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 text-white">
                <h1 className="text-4xl font-light">Adatok megtekintése</h1>
                <h1 className="text-lg font-bold text-slate-300">
                    Munka: #{shipment.id}
                </h1>
                <div className="mt-4">
                    <div>
                        Indulási cím:{" "}
                        <span className="text-indigo-400 font-bold">
                            {shipment.departure_address}
                        </span>
                    </div>
                    <div>
                        Érkezési cím:{" "}
                        <span className="text-indigo-400 font-bold">
                            {shipment.arrival_address}
                        </span>
                    </div>
                    <div>
                        Címzett neve:{" "}
                        <span className="text-indigo-400 font-bold">
                            {shipment.consignee.last_name}{" "}
                            {shipment.consignee.first_name}
                        </span>
                    </div>
                    <div>
                        Címzett telefonszáma:{" "}
                        <span className="text-indigo-400 font-bold">
                            {shipment.consignee.phone_number}
                        </span>
                    </div>
                    <div>
                        Fuvarozó:{" "}
                        <span className="text-indigo-400 font-bold">
                            {shipment.carrier.last_name}{" "}
                            {shipment.carrier.first_name}
                        </span>
                    </div>
                    <div>
                        Státusz:{" "}
                        <span className="text-indigo-400 font-bold">
                            {SHIPMENT_STATUS[shipment.status]}
                        </span>
                    </div>
                </div>
                <div className="mt-6 flex gap-2 justify-end">
                    <Link
                        href={route("shipments.index")}
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
                    >
                        Vissza
                    </Link>

                    <Link
                        href={route("shipments.edit", shipment)}
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                    >
                        Szerkesztés
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
