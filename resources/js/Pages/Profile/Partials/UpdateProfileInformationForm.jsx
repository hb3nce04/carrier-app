import InputError from "@/Components/form/InputError.jsx";
import InputLabel from "@/Components/form/InputLabel.jsx";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/form/TextInput.jsx";
import { Link, useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const { user } = usePage().props.auth;

    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"), {
            onSuccess: () => {
                toast.success("Adatok módosítva!");
            },
            onError: () => {
                if (!errors) {
                    toast.error("Hiba történt az adatok módosítása során!");
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Adatok módosítása
                </h2>
                <span className="text-gray-700 dark:text-gray-400">
                    Szerepkör:{" "}
                    <span className="font-bold">
                        {user.role}
                    </span>
                </span>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Felhasználónév" />

                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) =>
                            setData("name", e.target.value)
                        }
                        required
                    />

                    <InputError
                        className="mt-2"
                        message={errors.name}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="E-mail cím" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                E-mail újraküldése
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                Megerősítő link elküldve.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Mentés</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
