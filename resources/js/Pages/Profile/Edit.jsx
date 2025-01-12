import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout title="Profil">
            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className="max-w-xl"
                />
            </div>

            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                <UpdatePasswordForm className="max-w-xl" />
            </div>

            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                <DeleteUserForm className="max-w-xl" />
            </div>
        </AuthenticatedLayout>
    );
}
