import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { SHIPMENT_STATUS } from "@/consts.js";
import SelectInput from "@/Components/form/SelectInput.jsx";
import toast from "react-hot-toast";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import {renderLabels} from "@/utils.jsx";

const shipmentLabels = [
    {name: "Indulási cím", value: "departure_address.full_address"},
    {name: "Érkezési cím", value: "consignee.address.full_address"},
    {name: "Címzett neve", value: "consignee.full_name"},
    {name: "Címzett telefonszáma", value: "consignee.phone_number"},
    {name: "Fuvarozó", value: "carrier.full_name"},
    {name: "Rögzítés dátuma", value: "created_at"},
    {name: "Utolsó módosítás dátuma", value: "updated_at"},
]

export default function Edit({
    shipment,
    can = { update: false, changeStatus: false, delete: false },
}) {
    const {
        data,
        setData,
        delete: destroy,
        patch,
    } = useForm({
        status: shipment.status,
    });

    const onSubmitDelete = (e) => {
        e.preventDefault();
        destroy(route("shipments.destroy", shipment.id), {
            onSuccess: () => {
                toast.success("Munka sikeresen törölve!");
            },
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        patch(route("shipments.changeStatus", shipment), {
            onSuccess: () => {
                toast.success("Státusz sikeresen módosítva!");
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Munka #${shipment.id}`} />

            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 text-white">
                <h1 className="text-4xl font-light">Adatok megtekintése</h1>
                <h1 className="text-lg font-bold text-slate-300">
                    Munka: #{shipment.id}
                </h1>
                <div className="mt-4">
                    {renderLabels(shipmentLabels, shipment).slice(0,5)}
                    <div>
                        {can.changeStatus ? (
                            <form
                                onSubmit={onSubmit}
                                className="flex flex-row items-center gap-2"
                            >
                                Státusz:
                                <SelectInput
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    className="ml-3 my-1"
                                >
                                    {Object.keys(SHIPMENT_STATUS).map(
                                        (status, i) => (
                                            <option key={i} value={status}>
                                                {SHIPMENT_STATUS[status]}
                                            </option>
                                        )
                                    )}
                                </SelectInput>
                                <PrimaryButton>Mentés</PrimaryButton>
                            </form>
                        ) : (
                            <>
                                Státusz:{" "}
                                <span className="text-indigo-400 font-bold">
                                    {SHIPMENT_STATUS[shipment.status]}
                                </span>
                            </>
                        )}
                    </div>
                    {renderLabels(shipmentLabels, shipment).slice(5)}
                </div>
                <div className="mt-6 flex gap-2 justify-end">
                    <Link
                        href={route("shipments.index")}
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
                    >
                        Vissza
                    </Link>

                    {can.update && (
                        <Link
                            href={route("shipments.edit", shipment)}
                            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                        >
                            Szerkesztés
                        </Link>
                    )}

                    {can.delete && (
                        <form onSubmit={onSubmitDelete}>
                            <DangerButton>Törlés</DangerButton>
                        </form>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
