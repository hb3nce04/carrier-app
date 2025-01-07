import ApplicationLogo from "@/Components/layout/ApplicationLogo.jsx";
import {Head, Link} from "@inertiajs/react";

export default function GuestLayout({children, title}) {
    return (
        <>
            <Head title={title}/>
            <div
                className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-gray-900">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="text-4xl"/>
                    </Link>
                </div>

                <div
                    className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                    {children}
                </div>
            </div>
        </>
    );
}
