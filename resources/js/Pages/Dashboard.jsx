import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { user } = usePage().props.auth;
    return (
        <AuthenticatedLayout>
            <Head title="Főoldal" />

            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    Üdvözöllek,{" "}
                    <span className="font-bold">
                        {user.name}
                    </span>
                    ! Kérlek válassz a menüpontok közül.
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
