import Checkbox from "@/Components/form/Checkbox.jsx";
import InputError from "@/Components/form/InputError.jsx";
import InputLabel from "@/Components/form/InputLabel.jsx";
import PrimaryButton from "@/Components/form/button/PrimaryButton.jsx";
import TextInput from "@/Components/form/TextInput.jsx";
import GuestLayout from "@/Layouts/GuestLayout";
import {Link, useForm} from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Login({status, canResetPassword}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
            onSuccess: () => {
                toast.success("Sikeresen bejelentkeztél!");
            },
            onError: () => {
                if (!errors) {
                    toast.error("Hiba történt a bejelentkezés során!");
                }
            },
        });
    };

    return (
        <GuestLayout title="Bejelentkezés">
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email"/>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Jelszó"/>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2"/>
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                            Emlékezz rám
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                        >
                            Elfelejtett jelszó
                        </Link>
                    )}

                    <Link
                        href={route("register")}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        Regisztráció
                    </Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Bejelentkezés
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
