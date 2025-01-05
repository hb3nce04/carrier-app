import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, useForm} from "@inertiajs/react";

import PrimaryButton from "@/Components/PrimaryButton";
import {SHIPMENT_STATUS} from "@/consts.js";
import toast from "react-hot-toast";
import FormTitle from "@/Components/form/FormTitle.jsx";
import {
    extractFieldIdsWithValue,
    handleSelectChange,
    renderInputFields,
    renderLabels
} from "@/utils.jsx";
import SelectInputGroup from "@/Components/form/SelectInputGroup.jsx";
import {useEffect, useState} from "react";

const departureFields = [
    {id: "departure_postal", label: "Irányítószám", type: "number"},
    {id: "departure_city", label: "Város"},
    {id: "departure_street_name", label: "Utcanév"},
    {id: "departure_street_number", label: "Házszám"},
];

const defConsigneeFields = [
    {id: "consignee_last_name", label: "Címzett vezetékneve"},
    {id: "consignee_first_name", label: "Címzett keresztneve"},
    {id: "consignee_phone_number", label: "Címzett telefonszáma"},
    {id: "consignee_postal", label: "Irányítószám", type: "number"},
    {id: "consignee_city", label: "Város"},
    {id: "consignee_street_name", label: "Utcanév"},
    {id: "consignee_street_number", label: "Házszám"},
];

const shipmentLabels = [
    {name: "Rögzítés dátuma", value: "created_at"},
    {name: "Utolsó módosítás dátuma", value: "updated_at"},
]

// TODO: processing state to button
export default function Edit({shipment, carriers, streetSuffixes, consignees}) {
    const [consigneeFields, setConsigneeFields] = useState(defConsigneeFields);

    const {data, setData, put, errors} = useForm({
        ...extractFieldIdsWithValue(departureFields, {
            "departure_postal": shipment.departure_address.postal,
            "departure_city": shipment.departure_address.city,
            "departure_street_name": shipment.departure_address.street_name,
            "departure_street_number": shipment.departure_address.number
        }),
        ...extractFieldIdsWithValue(consigneeFields, {
            "consignee_postal": shipment.consignee.address.postal,
            "consignee_city": shipment.consignee.address.city,
            "consignee_street_name": shipment.consignee.address.street_name,
            "consignee_street_number": shipment.consignee.address.number,
            "consignee_last_name": shipment.consignee.last_name,
            "consignee_first_name": shipment.consignee.first_name,
            "consignee_phone_number": shipment.consignee.phone_number,
        }),
        "departure_street_suffix": shipment.departure_address.street_suffix.id,
        "consignee_street_suffix": shipment.consignee.address.street_suffix.id,
        consignee_id: shipment.consignee.id,
        carrier_id: shipment.carrier.id,
        status: shipment.status,
    });

    const disableConsigneeFieldsState = (disabled) => {
        const updatedFields = consigneeFields.map((field) => ({
            ...field,
            disabled,
        }));
        setConsigneeFields(updatedFields);
    }

    const clearConsigneeFields = () => {
        setData("consignee_first_name", "");
        setData("consignee_last_name", null);
        setData("consignee_phone_number", null);
    }

    const handleConsigneeSelect = (e) => {
        const value = e.target.value;
        disableConsigneeFieldsState(parseInt(value) !== -1);
        if (value !== -1) {
            const selected = consignees.data[value - 1];
            setData("consignee_first_name", selected.first_name);
            setData("consignee_last_name", selected.last_name);
            setData("consignee_phone_number", selected.phone_number);
        } else {
            clearConsigneeFields();
        }
        //setData(e.target.id.split('s')[0] + "_id", e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        put(route("shipments.update", shipment), {
            onSuccess: () => {
                toast.success("Munka sikeresen módosítva!");
            },
            onError: () => {
                if (!errors) {
                    toast.error("Hiba történt a munka módosítása során!");
                }
            },
        });
    };

    useEffect(() => {
        disableConsigneeFieldsState(true);
    }, [])

    return (
        <AuthenticatedLayout>
            <Head title={`Munka #${shipment.id}`}/>

            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 text-white">
                <h1 className="text-4xl font-light">Adatok módosítása</h1>
                <h1 className="text-lg font-bold text-slate-300">
                    Munka: #{shipment.id}
                </h1>
                <form onSubmit={onSubmit} className="mt-5">
                    <div
                        className="flex flex-col gap-2">
                        <FormTitle>Indulási cím</FormTitle>
                        <div className="flex gap-2">
                            {renderInputFields(departureFields.slice(0, 2), data, errors, setData)}
                            <SelectInputGroup id="departure_street_suffix" label="Utca jellege"
                                              value={data.departure_street_suffix}
                                              error={errors.departure_street_suffix} setData={setData} disabled={true}>
                                {streetSuffixes.map((suffix, i) => (<option key={i} value={suffix.id}>
                                    {suffix.name}
                                </option>))}
                            </SelectInputGroup>
                            {renderInputFields(departureFields.slice(3), data, errors, setData)}

                        </div>
                        <FormTitle className="mt-2">Címzett adatai</FormTitle>
                        <div className="grid grid-cols-3 divide-x divide-slate-300 dark:divide-slate-700">
                            <div className="mr-2 col-span-2">
                                <div
                                    className="flex gap-2">{renderInputFields(consigneeFields.slice(0, 3), data, errors, setData)}</div>
                                <div className="flex gap-2 mt-2">
                                    {renderInputFields(consigneeFields.slice(3, 6), data, errors, setData)}
                                    <SelectInputGroup id="consignee_street_suffix" label="Utca jellege"
                                                      value={data.consignee_street_suffix}
                                                      error={errors.consignee_street_suffix} setData={setData}>
                                        {streetSuffixes.map((suffix, i) => (<option key={i} value={suffix.id}>
                                            {suffix.name}
                                        </option>))}
                                    </SelectInputGroup>
                                    {renderInputFields(consigneeFields.slice(7), data, errors, setData)}
                                </div>
                            </div>
                            <div className="ml-2 flex items-center justify-center p-6">
                                <SelectInputGroup id="consignee" label="Címzettek" value={data.consignee_id}
                                                  error={errors.consignees}
                                                  onChange={handleConsigneeSelect}>
                                    <option value={-1}>Új címzett megadása</option>
                                    {consignees.data.map((consignee, i) => (<option key={i} value={consignee.id}>
                                        {consignee.full_name}
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
                    <div className="mt-2">{renderLabels(shipmentLabels, shipment)}</div>

                    <div className="mt-6 flex gap-2 justify-end">
                        <Link
                            href={route("shipments.index")}
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
                        >
                            Vissza
                        </Link>
                        <PrimaryButton>Módosítás</PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
