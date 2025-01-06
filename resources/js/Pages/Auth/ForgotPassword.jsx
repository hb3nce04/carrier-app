import InputError from "@/Components/form/InputError.jsx";
import PrimaryButton from "@/Components/form/button/PrimaryButton.jsx";
import TextInput from "@/Components/form/TextInput.jsx";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout title="Elfelejtett jelszó">
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Elfelejtetted a jelszavadat? Semmi probléma. Ha megadod az
                e-mail címed akkor küldünk neked egy linket amivel megadhatsz
                egy újat.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("email", e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route("login")}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        Vissza a bejelentkezéshez
                    </Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Elküld
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
