import { Table } from "@/Components/custom/Table";
import PrimaryButton from "@/Components/PrimaryButton";
import { SHIPMENT_STATUS, SHIPMENT_TABLE_COLUMNS } from "@/consts";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ shipments }) {
    const rows = shipments.data.map((shipment) => {
        return {
            ...shipment,
            consignee: `${shipment.consignee.last_name} ${shipment.consignee.first_name} (${shipment.consignee.phone_number})`,
            carrier: `${shipment.carrier.last_name} ${shipment.carrier.first_name}`,
            status: SHIPMENT_STATUS[shipment.status],
        };
    });

    return (
        <AuthenticatedLayout>
            <Head title="Munkák" />

            <div className="relative overflow-x-auto text-gray-500 dark:text-gray-400">
                <div className="flex justify-end m-2">
                    <PrimaryButton>
                        <Link href={route("shipments.create")}>
                            Új munka létrehozása
                        </Link>
                    </PrimaryButton>
                </div>
                <Table
                    rows={rows}
                    columns={SHIPMENT_TABLE_COLUMNS}
                    routeName={"shipments"}
                />
            </div>
        </AuthenticatedLayout>
    );
}
