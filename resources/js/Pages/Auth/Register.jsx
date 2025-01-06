import InputError from "@/Components/form/InputError.jsx";
import InputLabel from "@/Components/form/InputLabel.jsx";
import PrimaryButton from "@/Components/form/button/PrimaryButton.jsx";
import TextInput from "@/Components/form/TextInput.jsx";
import GuestLayout from "@/Layouts/GuestLayout";
import {Link, useForm} from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Register() {
    const {data, setData, post, processing, errors, reset} = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
            onSuccess: () => {
                toast.success("Sikeres regisztráció!");
            },
            onError: () => {
                if (!errors) {
                    toast.error("Hiba történt a regisztráció során!");
                }
            },
        });
    };

    return (
        <GuestLayout title="Regisztráció">
            <form onSubmit={submit}>
                <div>
                    <div>
                        <InputLabel htmlFor="name" value="Felhasználónév"/>

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            onChange={(e) =>
                                setData("name", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.name}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email"/>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={(e) => setData("email", e.target.value)}
                        required
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
                        required
                    />

                    <InputError message={errors.password} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Jelszó mégegyszer"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="password_confirmation"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route("login")}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        Bejelentkezés
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Regisztráció
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
