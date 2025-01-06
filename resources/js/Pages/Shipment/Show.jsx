import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { SHIPMENT_STATUS } from "@/consts.js";
import SelectInput from "@/Components/form/SelectInput.jsx";
import toast from "react-hot-toast";
import DangerButton from "@/Components/form/button/DangerButton.jsx";
import PrimaryButton from "@/Components/form/button/PrimaryButton.jsx";
import {renderLabels} from "@/utils.jsx";
import SecondaryLink from "@/Components/form/button/SecondaryLink.jsx";
import PrimaryLink from "@/Components/form/button/PrimaryLink.jsx";

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
        <AuthenticatedLayout title={`Munka #${shipment.id}`}>
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
                    <SecondaryLink
                        href={route("shipments.index")}
                    >
                        Vissza
                    </SecondaryLink>

                    {can.update && (
                        <PrimaryLink
                            href={route("shipments.edit", shipment)}
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
