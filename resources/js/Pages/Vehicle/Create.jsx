import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/custom/SelectInput";
import toast from "react-hot-toast";

export default function Create({ carriers }) {
    const { data, setData, post, errors } = useForm({
        brand: "",
        model: "",
        plate_number: "",
        carrier_id: 1,
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("vehicles.store"), {
            onSuccess: () => {
                toast.success("Jármű sikeresen létrehozva!");
            },
            onError: () => {
                if (!errors) {
                    toast.error("Hiba történt a jármű létrehozása során!");
                }
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={"Új jármű létrehozása"} />

            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 text-white">
                <h1 className="text-4xl font-light">Új jármű létrehozása</h1>
                <form onSubmit={onSubmit} className="mt-5">
                    <div>
                        <InputLabel
                            htmlFor="brand"
                            value="Márka"
                        />
                        <TextInput
                            id="brand"
                            type="text"
                            name="text"
                            value={data.brand}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("brand", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.brand}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="model"
                            value="Model"
                        />
                        <TextInput
                            id="model"
                            type="text"
                            name="text"
                            value={data.model}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("model", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.model}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="plate_number"
                            value="Rendszám"
                        />
                        <TextInput
                            id="plate_number"
                            type="text"
                            name="text"
                            value={data.plate_number}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("plate_number", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.plate_number}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="carriers" value="Fuvarozók"/>
                        <SelectInput
                            id="carriers"
                            name="carriers"
                            value={data.carrier_id}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("carrier_id", e.target.value)
                            }
                        >
                            {carriers.data.length === 0 && <option key={0} value={0}>
                                Jelenleg nincs jármű nélküli fuvarozó!
                            </option>}
                            {carriers.data.map((carrier, i) => (
                                <option key={i} value={carrier.id}>
                                    {carrier.full_name}
                                </option>
                            ))}
                        </SelectInput>
                        <InputError
                            message={errors.carrier_id}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex gap-2 justify-end">
                        <Link
                            href={route("vehicles.index")}
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
