import { Link, useForm } from "@inertiajs/react";

import { MdEdit, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import DangerButton from "../DangerButton";

import Modal from "../Modal";
import SecondaryButton from "../SecondaryButton";
import { useState } from "react";
import toast from "react-hot-toast";

export function Table({
    rows,
    columns,
    routeName,
    canUpdate = false,
    canDelete = false,
}) {
    const [confirmingDeleteRow, setConfirmingDeleteRow] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const { delete: destroy, processing } = useForm();

    const confirmDelete = (row) => {
        setSelectedRow(row);
        setConfirmingDeleteRow(true);
    };

    const deleteRow = (e) => {
        e.preventDefault();

        destroy(route(`${routeName}.destroy`, selectedRow), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                toast.success("Sor sikeresen törölve!");
            },
            onError: () => {
                toast.error("Hiba történt a sor törlése során!");
            },
        });
    };

    const closeModal = () => {
        setConfirmingDeleteRow(false);
        setSelectedRow(null);
    };

    return (
        <>
            <Modal show={confirmingDeleteRow} onClose={closeModal}>
                <form onSubmit={deleteRow} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Biztosan törölni szeretnéd ezt a sort?
                    </h2>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Mégsem
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Törlés
                        </DangerButton>
                    </div>
                </form>
            </Modal>
            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {columns.map((column, i) => (
                            <th scope="col" className={"px-6 py-3"} key={i}>
                                {column.text}
                            </th>
                        ))}
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 &&
                        rows.map((row, i) => (
                            <tr
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  hover:bg-gray-100 dark:hover:bg-gray-700"
                                key={i}
                            >
                                {columns.map((column, columnIndex) => (
                                    <td
                                        scope="col"
                                        className="px-6 py-3"
                                        key={columnIndex}
                                    >
                                        {row[column.name]}
                                    </td>
                                ))}
                                <td>
                                    <div className="p-2 text-2xl flex gap-2">
                                        <Link
                                            href={route(
                                                `${routeName}.show`,
                                                row
                                            )}
                                        >
                                            <FaEye
                                                className="hover:text-sky-700 transition"
                                                title="Megtekintés"
                                            />
                                        </Link>
                                        {canUpdate && (
                                            <Link
                                                href={route(
                                                    `${routeName}.edit`,
                                                    row
                                                )}
                                            >
                                                <MdEdit
                                                    className="hover:text-green-700 transition"
                                                    title="Módosítás"
                                                />
                                            </Link>
                                        )}

                                        {canDelete && (
                                            <MdDelete
                                                onClick={() =>
                                                    confirmDelete(row)
                                                }
                                                className="hover:text-red-700 transition cursor-pointer"
                                                title="Törlés"
                                            />
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {rows.length === 0 ? (
                <div className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 w-full text-center p-2">
                    Nincs megjeleníthető adat.
                </div>
            ) : null}
        </>
    );
}
