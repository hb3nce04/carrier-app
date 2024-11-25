import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Főoldal" />

            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    Sikeresen bejelentkeztél, kéválassz a fenti menüpontok
                    közül!
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
