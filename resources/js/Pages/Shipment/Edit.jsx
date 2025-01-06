import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {useForm} from "@inertiajs/react";

import {SHIPMENT_STATUS} from "@/consts.js";
import toast from "react-hot-toast";
import FormTitle from "@/Components/form/FormTitle.jsx";
import {
    extractFields,
    handleSingleSelect,
    renderInputFields,
    renderLabels
} from "@/utils.jsx";
import SelectInputGroup from "@/Components/form/group/SelectInputGroup.jsx";
import {useEffect, useState} from "react";
import Form from "@/Components/custom/Form.jsx";

const departureFields = [
    {id: "departure_postal", label: "Irányítószám", type: "number"},
    {id: "departure_city", label: "Város"},
    {id: "departure_street_name", label: "Utcanév"},
    {id: "departure_street_number", label: "Házszám"},
];

const defConsigneeFields = [
    {id: "consignee_last_name", label: "Címzett vezetékneve"},
    {id: "consignee_first_name", label: "Címzett keresztneve"},
    {id: "consignee_phone_number", label: "Címzett telefonszáma", type: "tel"},
    {id: "consignee_postal", label: "Irányítószám", type: "number"},
    {id: "consignee_city", label: "Város"},
    {id: "consignee_street_name", label: "Utcanév"},
    {id: "consignee_street_number", label: "Házszám"},
];

const shipmentLabels = [
    {name: "Rögzítés dátuma", value: "created_at"},
    {name: "Utolsó módosítás dátuma", value: "updated_at"},
]

export default function Edit({shipment, carriers, streetSuffixes, consignees}) {
    const [consigneeFields, setConsigneeFields] = useState(defConsigneeFields);

    const [isConsigneeFieldsDisabled, disableConsigneeFields] = useState(false);

    const {data, setData, put, errors} = useForm({
        ...extractFields(departureFields, {
            "departure_postal": shipment.departure_address.postal,
            "departure_city": shipment.departure_address.city,
            "departure_street_name": shipment.departure_address.street_name,
            "departure_street_number": shipment.departure_address.number
        }),
        ...extractFields(consigneeFields, {
            "consignee_postal": shipment.consignee.address.postal,
            "consignee_city": shipment.consignee.address.city,
            "consignee_street_name": shipment.consignee.address.street_name,
            "consignee_street_number": shipment.consignee.address.number,
            "consignee_last_name": shipment.consignee.last_name,
            "consignee_first_name": shipment.consignee.first_name,
            "consignee_phone_number": shipment.consignee.phone_number,
        }),
        "departure_street_suffix_id": shipment.departure_address.street_suffix.id,
        "consignee_street_suffix_id": shipment.consignee.address.street_suffix.id,
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
        disableConsigneeFields(disabled)
    }

    const handleConsigneeSelect = (e) => {
        const value = parseInt(e.target.value);
        setData('consignee_id', value)
        disableConsigneeFieldsState(value !== -1);
        if (value !== -1) {
            const selected = consignees.data[value - 1];
            setData(data => (
                {
                    ...data,
                    consignee_first_name: selected.first_name,
                    consignee_last_name: selected.last_name,
                    consignee_phone_number: selected.phone_number,
                    consignee_postal: selected.address.postal,
                    consignee_city: selected.address.city,
                    consignee_street_name: selected.address.street_name,
                    consignee_street_suffix_id: selected.address.street_suffix.id,
                    consignee_street_number: selected.address.number,
                }));
        } else {
            setData(data => (
                {
                    ...data,
                    consignee_first_name: "",
                    consignee_last_name: "",
                    consignee_phone_number: "",
                    consignee_postal: "",
                    consignee_city: "",
                    consignee_street_name: "",
                    consignee_street_suffix_id: 0,
                    consignee_street_number: "",
                }));
        }
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
        disableConsigneeFields(true);
    }, [])

    return (
        <AuthenticatedLayout title={`Munka #${shipment.id}`}>
            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 text-white">
                <h1 className="text-4xl font-light">Adatok módosítása</h1>
                <h1 className="text-lg font-bold text-slate-300">
                    Munka: #{shipment.id}
                </h1>
                <Form className="flex flex-col gap-2" onSubmit={onSubmit} submitText={"Módosítás"}
                      backLink={"shipments.index"}>
                    <FormTitle>Indulási cím</FormTitle>
                    <div className="flex gap-2">
                        {renderInputFields(departureFields.slice(0, 2), data, errors, setData)}
                        <SelectInputGroup id="departure_street_suffix_id" label="Utca jellege"
                                          value={data.departure_street_suffix_id}
                                          error={errors.departure_street_suffix_id} setData={setData}>
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
                                <SelectInputGroup id="consignee_street_suffix_id" label="Utca jellege"
                                                  value={data.consignee_street_suffix_id}
                                                  error={errors.consignee_street_suffix_id} setData={setData}
                                                  disabled={isConsigneeFieldsDisabled}>
                                    {streetSuffixes.map((suffix, i) => (<option key={i} value={suffix.id}>
                                        {suffix.name}
                                    </option>))}
                                </SelectInputGroup>
                                {renderInputFields(consigneeFields.slice(6), data, errors, setData)}
                            </div>
                        </div>
                        <div className="ml-2 flex items-center justify-center p-6">
                            <SelectInputGroup id="consignee" label="Címzettek" value={data.consignee_id}
                                              error={errors.consignee_id}
                                              onChange={handleConsigneeSelect}>
                                <option value={-1}>Új címzett megadása</option>
                                {consignees.data.map((consignee, i) => (<option key={i} value={consignee.id}>
                                    {consignee.full_name}
                                </option>))}
                            </SelectInputGroup>
                        </div>
                    </div>
                    <SelectInputGroup id="carriers" label="Fuvarozók" value={data.carrier_id}
                                      error={errors.carrier_id}
                                      onChange={(e) => handleSingleSelect(e, setData)}>
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
                    <div>{renderLabels(shipmentLabels, shipment)}</div>
                </Form>
            </div>
        </AuthenticatedLayout>
    );
}
