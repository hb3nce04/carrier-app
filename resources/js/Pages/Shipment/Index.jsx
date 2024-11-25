import { SHIPMENT_STATUS, SHIPMENT_TABLE_COLUMNS } from "@/consts";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ shipments }) {
    console.log(shipments);
    return (
        <AuthenticatedLayout>
            <Head title="Munkák" />

            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {SHIPMENT_TABLE_COLUMNS.map((column) => (
                                <th scope="col" class="px-6 py-3">
                                    {column.text}
                                </th>
                            ))}
                            <th scope="col" class="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {shipments.data.map((shipment) => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                {SHIPMENT_TABLE_COLUMNS.map((column) => (
                                    <>
                                        <td scope="col" class="px-6 py-3">
                                            {(() => {
                                                switch (column.name) {
                                                    case "status":
                                                        return SHIPMENT_STATUS[
                                                            shipment[
                                                                column.name
                                                            ]
                                                        ];
                                                    case "consignee":
                                                        return `${
                                                            shipment[
                                                                column.name
                                                            ].name
                                                        } (${
                                                            shipment[
                                                                column.name
                                                            ].phone_number
                                                        })`;
                                                    default:
                                                        return shipment[
                                                            column.name
                                                        ];
                                                }
                                            })()}
                                        </td>
                                    </>
                                ))}
                                <td>asd</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
