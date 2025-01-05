import { Table } from "@/Components/custom/Table";
import PrimaryButton from "@/Components/PrimaryButton";
import { VEHICLE_TABLE_COLUMNS } from "@/consts.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ vehicles, can = {delete: false, update: false} }) {
    const rows = vehicles.data.map((vehicle) => {
        return {
            ...vehicle,
            carrier: `${vehicle.carrier.full_name}`,
        };
    });

    return (
        <AuthenticatedLayout>
            <Head title="Járművek" />

            <div className="relative overflow-x-auto text-gray-500 dark:text-gray-400">
                <div className="flex justify-end m-2">
                    <PrimaryButton>
                        <Link href={route("vehicles.create")}>
                            Új jármű létrehozása
                        </Link>
                    </PrimaryButton>
                </div>
                <Table
                    rows={rows}
                    columns={VEHICLE_TABLE_COLUMNS}
                    routeName={"vehicles"}
                    canDelete={can.delete}
                    canUpdate={can.update}
                />
            </div>
        </AuthenticatedLayout>
    );
}
