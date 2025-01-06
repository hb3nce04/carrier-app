import {Table} from "@/Components/custom/Table";
import {CARRIER_TABLE_COLUMNS} from "@/consts.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryLink from "@/Components/form/button/PrimaryLink.jsx";

export default function Index({carriers, can = {delete: false, update: false}}) {
    const rows = carriers.data.map((carrier) => {
        return {
            ...carrier
        };
    });

    return (
        <AuthenticatedLayout title="Fuvarozók">
            <div className="relative overflow-x-auto text-gray-500 dark:text-gray-400">
                <div className="flex justify-end my-4 gap-4 items-center">
                    <PrimaryLink>
                        Új fuvarozó létrehozása
                    </PrimaryLink>
                </div>
                <Table
                    rows={rows}
                    columns={CARRIER_TABLE_COLUMNS}
                    routeName={"carriers"}
                    can={can}
                />
            </div>
        </AuthenticatedLayout>
    );
}
