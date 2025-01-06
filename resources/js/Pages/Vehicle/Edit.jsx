import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {useForm} from "@inertiajs/react";

import toast from "react-hot-toast";
import {extractFields, handleSingleSelect, renderInputFields, renderLabels} from "@/utils.jsx";
import SelectInputGroup from "@/Components/form/group/SelectInputGroup.jsx";
import Form from "@/Components/custom/Form.jsx";

const vehicleFields = [
    {id: "brand", label: "Márka"},
    {id: "model", label: "Model"},
    {id: "plate_number", label: "Rendszám"},
];

const vehicleLabels = [
    {name: "Rögzítés dátuma", value: "created_at"},
    {name: "Utolsó módosítás dátuma", value: "updated_at"},
]

export default function Edit({vehicle, carriers}) {
    const {data, setData, put, errors} = useForm({
        ...extractFields(vehicleFields, {
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
        <AuthenticatedLayout title={`Jármű #${vehicle.id}`}>
            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 text-white">
                <h1 className="text-4xl font-light">Adatok módosítása</h1>
                <h1 className="text-lg font-bold text-slate-300">
                    Jármű: #{vehicle.id}
                </h1>
                <Form className="flex flex-col gap-2" onSubmit={onSubmit} submitText={"Módosítás"}
                      backLink={"vehicles.index"}>
                    {renderInputFields(vehicleFields, data, errors, setData)}
                    <SelectInputGroup
                        id="carriers" label="Fuvarozók" value={data.carrier_id}
                        error={errors.carriers}
                        onChange={(e) => handleSingleSelect(e, setData)}>
                        {carriers.data.length === 0 &&
                            <option>Jelenleg nincs jármű nélküli fuvarozó!</option>}
                        {carriers.data.map((carrier, i) => (<option key={i} value={carrier.id}>
                            {carrier.full_name}
                        </option>))}
                    </SelectInputGroup>
                    <div>{renderLabels(vehicleLabels, vehicle)}</div>
                </Form>
            </div>
        </AuthenticatedLayout>
    );
}
