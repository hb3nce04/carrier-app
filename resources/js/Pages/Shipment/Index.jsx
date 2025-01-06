import Pagination from "@/Components/custom/Pagination";
import SelectInput from "@/Components/form/SelectInput.jsx";
import { Table } from "@/Components/custom/Table";
import { SHIPMENT_STATUS, SHIPMENT_TABLE_COLUMNS } from "@/consts.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import PrimaryLink from "@/Components/form/button/PrimaryLink.jsx";

export default function Index({
    shipments,
    can = { filter: false, create: false, update: false, delete: false },
    queryParams = { status: "" },
}) {
    queryParams = queryParams || {};
    const rows = shipments.data.map((shipment) => {
        return {
            ...shipment,
            departure_address: `${shipment.departure_address.full_address}`,
            consignee: `${shipment.consignee.full_name} (${shipment.consignee.phone_number})`,
            consignee_address: `${shipment.consignee.address.full_address}`,
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
        <AuthenticatedLayout title="Munkák">
            <div className="relative overflow-x-auto text-gray-500 dark:text-gray-400">
                <div className="flex justify-end my-4 gap-4 items-center">
                    {can.filter && (
                        <SelectInput
                            value={queryParams.status}
                            onChange={(e) => changeStatus(e.target.value)}
                            className="align-self-start"
                        >
                            <option key={0} value={""}>
                                Válassz státuszt!
                            </option>
                            {Object.keys(SHIPMENT_STATUS).map((status, i) => (
                                <option key={i} value={status || ""}>
                                    {SHIPMENT_STATUS[status]}
                                </option>
                            ))}
                        </SelectInput>
                    )}
                    {can.create && (
                        <>
                            <PrimaryLink
                                href={route("shipments.create")}
                            >
                                Új munka létrehozása
                            </PrimaryLink>
                        </>
                    )}
                </div>
                <Table
                    rows={rows}
                    columns={SHIPMENT_TABLE_COLUMNS}
                    routeName={"shipments"}
                    can={can}
                />
            </div>
            <Pagination links={shipments.meta.links} />
        </AuthenticatedLayout>
    );
}
