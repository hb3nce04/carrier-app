import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import DangerButton from "@/Components/DangerButton";
import {renderLabels} from "@/utils.jsx";

const vehicleLabels = [
    {name: "Márka", value: "brand"},
    {name: "Model", value: "model"},
    {name: "Rendszám", value: "plate_number"},
    {name: "Tulajdonos", value: "carrier.full_name"},
    {name: "Rögzítés dátuma", value: "created_at"},
    {name: "Utolsó módosítás dátuma", value: "updated_at"},
]

export default function Edit({
                                 vehicle,
    can = { update: false, delete: false },
}) {
    const {
        delete: destroy,
    } = useForm();

    const onSubmitDelete = (e) => {
        e.preventDefault();
        destroy(route("vehicles.destroy", vehicle.id), {
            onSuccess: () => {
                toast.success("Jármű sikeresen törölve!");
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Jármű #${vehicle.id}`} />

            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 text-white">
                <h1 className="text-4xl font-light">Adatok megtekintése</h1>
                <h1 className="text-lg font-bold text-slate-300">
                    Jármű: #{vehicle.id}
                </h1>
                <div className="mt-4">
                    {renderLabels(vehicleLabels, vehicle)}
                </div>
                <div className="mt-6 flex gap-2 justify-end">
                    <Link
                        href={route("vehicles.index")}
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
                    >
                        Vissza
                    </Link>
                    {can.update && (
                        <Link
                            href={route("vehicles.edit", vehicle)}
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
