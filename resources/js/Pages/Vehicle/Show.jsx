import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import DangerButton from "@/Components/form/button/DangerButton.jsx";
import {renderLabels} from "@/utils.jsx";
import SecondaryLink from "@/Components/form/button/SecondaryLink.jsx";
import PrimaryLink from "@/Components/form/button/PrimaryLink.jsx";

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
        <AuthenticatedLayout title={`Jármű #${vehicle.id}`}>
            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 text-white">
                <h1 className="text-4xl font-light">Adatok megtekintése</h1>
                <h1 className="text-lg font-bold text-slate-300">
                    Jármű: #{vehicle.id}
                </h1>
                <div className="mt-4">
                    {renderLabels(vehicleLabels, vehicle)}
                </div>
                <div className="mt-6 flex gap-2 justify-end">
                    <SecondaryLink
                        href={route("vehicles.index")}
                    >
                        Vissza
                    </SecondaryLink>
                    {can.update && (
                        <PrimaryLink
                            href={route("vehicles.edit", vehicle)}
                        >
                            Szerkesztés
                        </PrimaryLink>
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
