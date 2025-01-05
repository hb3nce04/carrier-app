import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

import PrimaryButton from "@/Components/PrimaryButton";
import toast from "react-hot-toast";
import {extractFieldIdsWithValue, handleSelectChange, renderInputFields, renderLabels} from "@/utils.jsx";
import SelectInputGroup from "@/Components/form/SelectInputGroup.jsx";
import SecondaryLink from "@/Components/SecondaryLink.jsx";

const vehicleFields = [
    {id: "brand", label: "Márka"},
    {id: "model", label: "Model"},
    {id: "plate_number", label: "Rendszám"},
];

const vehicleLabels = [
    {name: "Rögzítés dátuma", value: "created_at"},
    {name: "Utolsó módosítás dátuma", value: "updated_at"},
]

export default function Edit({ vehicle, carriers }) {
    const { data, setData, put, errors } = useForm({
        ...extractFieldIdsWithValue(vehicleFields, {
            "brand": vehicle.brand,
            "model": vehicle.model,
            "plate_number": vehicle.plate_number
        }),
        carrier_id: vehicle.carrier_id,
    });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route("vehicles.update", vehicle), {
            onSuccess: () => {
                toast.success("Jármű sikeresen módosítva!");
            },
            onError: () => {
                if (!errors) {
                    toast.error("Hiba történt a jármű módosítása során!");
                }
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Jármű #${vehicle.id}`} />
            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 text-white">
                <h1 className="text-4xl font-light">Adatok módosítása</h1>
                <h1 className="text-lg font-bold text-slate-300">
                    Jármű: #{vehicle.id}
                </h1>
                <form onSubmit={onSubmit} className="mt-5">
                    <div
                        className="flex flex-col gap-2">
                        {renderInputFields(vehicleFields, data, errors, setData)}
                        <SelectInputGroup
                            id="carriers" label="Fuvarozók" value={data.carrier_id}
                            error={errors.carriers}
                            onChange={(e) => handleSelectChange(e, setData)}>
                            {carriers.data.length === 0 &&
                                <option>Jelenleg nincs jármű nélküli fuvarozó!</option>}
                            {carriers.data.map((carrier, i) => (<option key={i} value={carrier.id}>
                                {carrier.full_name}
                            </option>))}
                        </SelectInputGroup>
                    </div>
                    <div className="mt-2">{renderLabels(vehicleLabels, vehicle)}</div>
                    <div className="mt-6 flex gap-2 justify-end">
                        <SecondaryLink href={route("vehicles.index")}>Vissza</SecondaryLink>
                        <PrimaryButton>Létrehozás</PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
