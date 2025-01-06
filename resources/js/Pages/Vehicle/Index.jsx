import { Table } from "@/Components/custom/Table";
import { VEHICLE_TABLE_COLUMNS } from "@/consts.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryLink from "@/Components/form/button/PrimaryLink.jsx";

export default function Index({ vehicles, can = {delete: false, update: false} }) {
    const rows = vehicles.data.map((vehicle) => {
        return {
            ...vehicle,
            carrier: `${vehicle.carrier.full_name}`,
        };
    });

    return (
        <AuthenticatedLayout title={"Járművek"}>
            <div className="relative overflow-x-auto text-gray-500 dark:text-gray-400">
                <div className="flex justify-end my-4 gap-4 items-center">
                    <PrimaryLink href={route("vehicles.create")}>
                        Új jármű létrehozása
                    </PrimaryLink>
                </div>
                <Table
                    rows={rows}
                    columns={VEHICLE_TABLE_COLUMNS}
                    routeName={"vehicles"}
                    can={can}
                />
            </div>
        </AuthenticatedLayout>
    );
}
