import DangerButton from "@/Components/form/button/DangerButton.jsx";
import InputError from "@/Components/form/InputError.jsx";
import InputLabel from "@/Components/form/InputLabel.jsx";
import Modal from "@/Components/custom/Modal.jsx";
import SecondaryButton from "@/Components/form/button/SecondaryButton.jsx";
import TextInput from "@/Components/form/TextInput.jsx";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Fiók sikeresen törölve!");
                closeModal();
            },
            onError: () => {
                passwordInput.current.focus();
                if (!errors) {
                    toast.error("Hiba történt a fiók törlése során!");
                }
            },
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Fiók törlése
                </h2>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Fiók törlése
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Biztosan törölni szeretnéd a fiókot?
                    </h2>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Jelszó"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Jelszó"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

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
        </section>
    );
}
