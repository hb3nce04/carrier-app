import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, useForm} from "@inertiajs/react";

import PrimaryButton from "@/Components/PrimaryButton";
import toast from "react-hot-toast";
import {extractFieldIds, handleSelectChange, renderInputFields} from "@/utils.jsx";
import SecondaryLink from "@/Components/SecondaryLink.jsx";
import SelectInputGroup from "@/Components/form/SelectInputGroup.jsx";

const vehicleFields = [
    {id: "brand", label: "Márka"},
    {id: "model", label: "Model"},
    {id: "plate_number", label: "Rendszám"},
];
export default function Create({carriers}) {
    const {data, setData, post, errors, processing} = useForm({
        ...extractFieldIds(vehicleFields),
        carrier_id: 1,
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("vehicles.store"), {
            onSuccess: () => {
                toast.success("Jármű sikeresen létrehozva!");
            },
            onError: (err) => {
                console.log(err)
                if (!errors) {
                    toast.error("Hiba történt a jármű létrehozása során!");
                }
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={"Új jármű létrehozása"}/>
            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 text-white">
                <h1 className="text-4xl font-light">Új jármű létrehozása</h1>
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
                    <div className="mt-6 flex gap-2 justify-end">
                        <SecondaryLink href={route("vehicles.index")}>Vissza</SecondaryLink>
                        <PrimaryButton disabled={processing}>Létrehozás</PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
