import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {usePage} from "@inertiajs/react";

export default function Dashboard() {
    const {user} = usePage().props.auth;
    return (
        <AuthenticatedLayout title="Főoldal">
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-3 text-lg text-gray-900 dark:text-gray-100">
                    Szia {" "}
                    <span className="font-bold">
                        {user.name}
                    </span>
                    ! Kérlek válassz a menüpontok közül.
                </div>
            </div>

            <div className="max-w-4xl grid grid-cols-3 gap-2 mt-4">
                <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <h3 className="text-amber-500 font-semiboold text-2xl">
                            Pending Tasks
                        </h3>
                        <p className="text-xl mt-4">
                            <span className="mr-2">1</span>/
                            <span className="ml-2">3</span>
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
