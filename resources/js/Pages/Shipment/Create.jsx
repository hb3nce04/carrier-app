import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import {SHIPMENT_STATUS} from "@/consts.js";
import toast from "react-hot-toast";
import FormTitle from "@/Components/form/FormTitle.jsx";
import SelectInputGroup from "@/Components/form/SelectInputGroup.jsx";
import SecondaryLink from "@/Components/SecondaryLink.jsx";
import {renderInputFields, extractFieldIds, handleSelectChange} from "@/utils.jsx";

const departureFields = [
    {id: "departure_postal", label: "Irányítószám", type: "number"},
    {id: "departure_city", label: "Város"},
    {id: "departure_street_name", label: "Utcanév"},
    {id: "departure_street_suffix", label: "Utca jelleg"},
    {id: "departure_street_number", label: "Házszám"},
];

const consigneeFields = [
    {id: "consignee_last_name", label: "Címzett vezetékneve"},
    {id: "consignee_first_name", label: "Címzett keresztneve"},
    {id: "consignee_phone_number", label: "Címzett telefonszáma"},
    {id: "consignee_postal", label: "Irányítószám", type: "number"},
    {id: "consignee_city", label: "Város"},
    {id: "consignee_street_name", label: "Utcanév"},
    {id: "consignee_street_suffix", label: "Utca jelleg"},
    {id: "consignee_street_number", label: "Házszám"},
];

export default function Create({carriers, streetSuffixes, consignees}) {
    const {data, setData, post, errors, processing} = useForm({
        ...extractFieldIds(departureFields),
        ...extractFieldIds(consigneeFields),
        suffix: 1,
        carrier_id: 1,
        status: "issued",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("shipments.store"), {
            onSuccess: () => {
                toast.success("Munka sikeresen létrehozva!");
            }, onError: () => {
                if (!errors) {
                    toast.error("Hiba történt a munka létrehozása során!");
                }
            },
        });
    };

    return (<AuthenticatedLayout>
            <Head title={"Új munka létrehozása"}/>

            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 text-white">
                <h1 className="text-4xl font-light">Új munka létrehozása</h1>
                <form onSubmit={onSubmit} className="mt-5">
                    <div
                        className="flex flex-col gap-2">
                        <FormTitle>Indulási cím</FormTitle>
                        <div className="flex gap-2">{renderInputFields(departureFields, data, errors, setData)}</div>
                        <FormTitle className="mt-2">Címzett adatai</FormTitle>
                        <div className="grid grid-cols-3 divide-x divide-slate-300 dark:divide-slate-700">
                            <div className="mr-2 col-span-2">
                                <div className="flex gap-2">{renderInputFields(consigneeFields.slice(0, 3), data, errors, setData)}</div>
                                <div className="flex gap-2 mt-2">
                                    {renderInputFields(consigneeFields.slice(3, 6), data, errors, setData)}
                                    <SelectInputGroup id="suffix" label="Utca jellege" value={data.suffix}
                                                      error={errors.suffix} setData={setData}>
                                        {streetSuffixes.map((suffix, i) => (<option key={i} value={suffix.id}>
                                            {suffix.name}
                                        </option>))}
                                    </SelectInputGroup>
                                    {renderInputFields(consigneeFields.slice(7), data, errors, setData)}
                                </div>
                            </div>
                            <div className="ml-2 flex items-center justify-center p-6">
                                <SelectInputGroup id="carriers" label="Címzettek" value={data.carrier_id}
                                                  error={errors.carriers}
                                                  onChange={(e) => handleSelectChange(e, setData)}>
                                    {carriers.data.length === 0 &&
                                        <option>Jelenleg nincs fuvarozó a rendszerben!</option>}
                                    {carriers.data.map((carrier, i) => (<option key={i} value={carrier.id}>
                                        {carrier.full_name}
                                    </option>))}
                                </SelectInputGroup>
                            </div>
                        </div>
                        <SelectInputGroup id="carriers" label="Fuvarozók" value={data.carrier_id}
                                          error={errors.carriers}
                                          onChange={(e) => handleSelectChange(e, setData)}>
                            {carriers.data.length === 0 &&
                                <option>Jelenleg nincs fuvarozó a rendszerben!</option>}
                            {carriers.data.map((carrier, i) => (<option key={i} value={carrier.id}>
                                {carrier.full_name}
                            </option>))}
                        </SelectInputGroup>
                        <SelectInputGroup id="status" label="Státusz" value={data.status}
                                          error={errors.status} setData={setData}>
                            {Object.keys(SHIPMENT_STATUS).map((status, i) => (<option key={i} value={status}>
                                {SHIPMENT_STATUS[status]}
                            </option>))}
                        </SelectInputGroup>
                    </div>
                    <div className="mt-6 flex gap-2 justify-end">
                        <SecondaryLink href={route("shipments.index")}>
                            Vissza
                        </SecondaryLink>
                        <PrimaryButton disabled={processing}>Létrehozás</PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
