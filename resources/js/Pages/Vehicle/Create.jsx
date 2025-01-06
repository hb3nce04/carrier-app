import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {useForm} from "@inertiajs/react";

import toast from "react-hot-toast";
import {extractFields, handleSingleSelect, renderInputFields} from "@/utils.jsx";
import SelectInputGroup from "@/Components/form/group/SelectInputGroup.jsx";
import Form from "@/Components/custom/Form.jsx";

const vehicleFields = [
    {id: "brand", label: "Márka"},
    {id: "model", label: "Model"},
    {id: "plate_number", label: "Rendszám"},
];
export default function Create({carriers}) {
    const {data, setData, post, errors} = useForm({
        ...extractFields(vehicleFields),
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
        <AuthenticatedLayout title={"Új jármű létrehozása"}>
            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 text-white">
                <h1 className="text-4xl font-light">Új jármű létrehozása</h1>
                <Form className="flex flex-col gap-2" onSubmit={onSubmit} submitText={"Létrehozás"}
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
                </Form>
            </div>
        </AuthenticatedLayout>
    );
}
