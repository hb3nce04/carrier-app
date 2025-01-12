import ApplicationLogo from "@/Components/layout/ApplicationLogo.jsx";
import Dropdown from "@/Components/form/Dropdown.jsx";
import NavLink from "@/Components/layout/NavLink.jsx";
import ResponsiveNavLink from "@/Components/layout/ResponsiveNavLink.jsx";
import {LINKS, Role} from "@/consts.js";
import {Head, Link, usePage} from "@inertiajs/react";
import {useState} from "react";

export default function AuthenticatedLayout({children, title}) {
    const {user} = usePage().props.auth;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <>
            <Head title={title}/>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <div className="flex shrink-0 items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block text-2xl"/>
                                    </Link>
                                </div>

                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    {LINKS.map((link, id) => {
                                        return (user.role === Role.ADMIN && link.protected) ||
                                        !link.protected ? (
                                            <NavLink
                                                key={id}
                                                href={route(link.name)}
                                                active={route().current(link.name)}
                                            >
                                                {link.text}
                                            </NavLink>
                                        ) : null;
                                    })}
                                </div>
                            </div>

                            <div className="hidden sm:ms-6 sm:flex sm:items-center">
                                <div className="relative ms-3">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="gap-1 inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                            >
                                                <span>
                                                    {user.name}
                                                </span>
                                                <span>
                                                    (
                                                    {user.role}
                                                    )
                                                </span>
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Fiók kezelése
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Kijelentkezés
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState
                                        )
                                    }
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            (showingNavigationDropdown ? "block" : "hidden") +
                            " sm:hidden"
                        }
                    >
                        <div className="space-y-1 pb-3 pt-2">
                            {LINKS.map((link, id) => {
                                return (user.role === Role.ADMIN && link.protected) ||
                                !link.protected ? (
                                    <ResponsiveNavLink
                                        key={id}
                                        href={route(link.name)}
                                        active={route().current(link.name)}
                                    >
                                        {link.text}
                                    </ResponsiveNavLink>
                                ) : null;
                            })}
                        </div>

                        <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                            <div className="px-4">
                                <div className="flex gap-1 text-base font-medium text-gray-800 dark:text-gray-200">
                                    <span>{user.name}</span>
                                    <span>({user.role})</span>
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Fiók kezelése
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Kijelentkezés
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                <main className="py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </>
    );
}
