import { Table } from "@/Components/custom/Table";
import PrimaryButton from "@/Components/PrimaryButton";
import { CARRIER_TABLE_COLUMNS } from "@/consts.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ carriers, can = {delete: false, update: false} }) {
    const rows = carriers.data.map((carrier) => {
        return {
            ...carrier
        };
    });

    return (
        <AuthenticatedLayout>
            <Head title="Fuvarozók" />

            <div className="relative overflow-x-auto text-gray-500 dark:text-gray-400">
                <div className="flex justify-end m-2">
                    <PrimaryButton>
                        <Link href={route("carriers.create")}>
                            Új fuvarozó létrehozása
                        </Link>
                    </PrimaryButton>
                </div>
                <Table
                    rows={rows}
                    columns={CARRIER_TABLE_COLUMNS}
                    routeName={"carriers"}
                    canDelete={can.delete}
                    canUpdate={can.update}
                />
            </div>
        </AuthenticatedLayout>
    );
}
