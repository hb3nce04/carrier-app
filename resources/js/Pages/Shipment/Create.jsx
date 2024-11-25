import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/custom/SelectInput";
import { SHIPMENT_STATUS } from "@/consts";
import toast from "react-hot-toast";

export default function Create({ carriers }) {
    const { data, setData, post, errors } = useForm({
        departure_address: "",
        arrival_address: "",
        consignee_last_name: "",
        consignee_first_name: "",
        consignee_phone_number: "",
        carrier_id: 1,
        status: "issued",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("shipments.store"), {
            onSuccess: () => {
                toast.success("Munka sikeresen létrehozva!");
            },
            onError: () => {
                if (!errors) {
                    toast.error("Hiba történt a munka létrehozása során!");
                }
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={"Új munka létrehozása"} />

            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 text-white">
                <h1 className="text-4xl font-light">Új munka létrehozása</h1>
                <form onSubmit={onSubmit} className="mt-5">
                    <div>
                        <InputLabel
                            htmlFor="departure_address"
                            value="Indulási cím"
                        />
                        <TextInput
                            id="departure_address"
                            type="text"
                            name="text"
                            value={data.departure_address}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("departure_address", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.departure_address}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="arrival_address"
                            value="Érkezési cím"
                        />
                        <TextInput
                            id="arrival_address"
                            type="text"
                            name="text"
                            value={data.arrival_address}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("arrival_address", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.arrival_address}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4 flex gap-2">
                        <div className="w-full">
                            <InputLabel
                                htmlFor="consignee_last_name"
                                value="Címzett vezetékneve"
                            />
                            <TextInput
                                id="consignee_last_name"
                                type="text"
                                name="text"
                                value={data.consignee_last_name}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData(
                                        "consignee_last_name",
                                        e.target.value
                                    )
                                }
                            />
                            <InputError
                                message={errors.consignee_last_name}
                                className="mt-2"
                            />
                        </div>
                        <div className="w-full">
                            <InputLabel
                                htmlFor="consignee_first_name"
                                value="Címzett keresztneve"
                            />
                            <TextInput
                                id="consignee_first_name"
                                type="text"
                                name="text"
                                value={data.consignee_first_name}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData(
                                        "consignee_first_name",
                                        e.target.value
                                    )
                                }
                            />
                            <InputError
                                message={errors.consignee_first_name}
                                className="mt-2"
                            />
                        </div>
                        <div className="w-full">
                            <InputLabel
                                htmlFor="consignee_phone_number"
                                value="Címzett telefonszáma"
                            />
                            <TextInput
                                id="consignee_phone_number"
                                type="text"
                                name="text"
                                value={data.consignee_phone_number}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData(
                                        "consignee_phone_number",
                                        e.target.value
                                    )
                                }
                            />
                            <InputError
                                message={errors.consignee_phone_number}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="carriers" value="Fuvarozók" />
                        <SelectInput
                            id="carriers"
                            name="carriers"
                            value={data.carrier_id}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("carrier_id", e.target.value)
                            }
                        >
                            {carriers.data.map((carrier, i) => (
                                <option key={i} value={carrier.id}>
                                    {carrier.last_name} {carrier.first_name}
                                </option>
                            ))}
                        </SelectInput>
                        <InputError
                            message={errors.carriers}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="status" value="Státusz" />
                        <SelectInput
                            id="status"
                            name="status"
                            value={data.status}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("status", e.target.value)}
                        >
                            {Object.keys(SHIPMENT_STATUS).map((status, i) => (
                                <option key={i} value={status}>
                                    {SHIPMENT_STATUS[status]}
                                </option>
                            ))}
                        </SelectInput>
                        <InputError message={errors.status} className="mt-2" />
                    </div>

                    <div className="mt-6 flex gap-2 justify-end">
                        <Link
                            href={route("shipments.index")}
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
                        >
                            Vissza
                        </Link>

                        <PrimaryButton>Létrehozás</PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
