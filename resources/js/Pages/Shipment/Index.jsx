import Pagination from "@/Components/custom/Pagination";
import SelectInput from "@/Components/custom/SelectInput";
import { Table } from "@/Components/custom/Table";
import { SHIPMENT_STATUS, SHIPMENT_TABLE_COLUMNS } from "@/consts";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({
    shipments,
    can = { filter: false, create: false, update: false, delete: false },
    queryParams = { status: "" },
}) {
    queryParams = queryParams || {};
    const rows = shipments.data.map((shipment) => {
        return {
            ...shipment,
            consignee: `${shipment.consignee.full_name} (${shipment.consignee.phone_number})`,
            carrier: `${shipment.carrier.full_name}`,
            status: SHIPMENT_STATUS[shipment.status],
        };
    });

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("shipments.index", queryParams));
    };

    const changeStatus = (value) => {
        searchFieldChanged("status", value);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Munkák" />

            <div className="relative overflow-x-auto text-gray-500 dark:text-gray-400">
                <div className="flex justify-end my-4 gap-4 items-center">
                    {can.filter && (
                        <SelectInput
                            value={queryParams.status}
                            onChange={(e) => changeStatus(e.target.value)}
                            className="align-self-start"
                        >
                            <option key={1} value={""}>
                                Válassz státuszt!
                            </option>
                            {Object.keys(SHIPMENT_STATUS).map((status, i) => (
                                <option key={i + 1} value={status}>
                                    {SHIPMENT_STATUS[status]}
                                </option>
                            ))}
                        </SelectInput>
                    )}
                    {can.create && (
                        <>
                            <Link
                                href={route("shipments.create")}
                                className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                            >
                                Új munka létrehozása
                            </Link>
                        </>
                    )}
                </div>
                <Table
                    rows={rows}
                    columns={SHIPMENT_TABLE_COLUMNS}
                    routeName={"shipments"}
                    canUpdate={can.update}
                    canDelete={can.delete}
                />
            </div>
            <Pagination links={shipments.meta.links} />
        </AuthenticatedLayout>
    );
}
