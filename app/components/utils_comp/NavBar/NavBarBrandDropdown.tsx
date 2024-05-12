import { Navbar } from 'flowbite-react';
import {Role} from "@/types";
interface NavBarCollapseProps {
    isOpen: boolean;
    toggleDropdown: () => void;
    rol: Role[] | null;
}
export default function NavBarBrandDropDown({ isOpen, toggleDropdown, rol }: NavBarCollapseProps) {
    return (
        <Navbar.Brand className="hover:bg-transparent hover:text-black">
            <div className="relative hover:text-black">
                <button
                    onClick={toggleDropdown}
                    className="flex items-center justify-between w-full py-2 px-3 text-white rounded hover:text-purple-300 md:hover:bg-transparent md:border-0 md:hover:text-purple-300 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                    Control de madurez
                    <svg className={`w-2.5 h-2.5 ms-2.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                {isOpen && (
                    <div className="absolute z-10 top-full left-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 max-h-48 overflow-y-auto">
                        <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-400"
                            aria-labelledby="dropdownLargeButton">
                            <li>
                                <a href="/home_page" className="block px-4 py-2 hover:text-purple-400">
                                    Formularios</a>
                            </li>
                            {rol?.some(role => role.name === "Admi senior") && (
                                <>
                                    <li>
                                        <a href="/home_page/maintenance" className="block px-4 py-2 hover:text-purple-400">Mantenimiento</a>
                                    </li>
                                    <li>
                                        <a href="/home_page/reports" className="block px-4 py-2 hover:text-purple-400">Exportar excel</a>
                                    </li>
                                    <li>
                                        <a href="/home_page/logger" className="block px-4 py-2 hover:text-purple-400">Logger</a>
                                    </li>
                                    <li>
                                        <a href="/home_page/create_account" className="block px-4 py-2 hover:text-purple-400">Crear cuenta</a>
                                    </li>
                                </>
                            )}
                            {rol?.some(role => role.name === ("Admi junior" || "Soporte")) && (
                                <>
                                    <li>
                                        <a href="/home_page/maintenance" className="block px-4 py-2 hover:text-purple-400">Mantenimiento</a>
                                    </li>
                                    <li>
                                        <a href="/home_page/reports" className="block px-4 py-2 hover:text-purple-400">Exportar excel</a>
                                    </li>
                                    <li>
                                        <a href="/home_page/logger" className="block px-4 py-2 hover:text-purple-400">Logger</a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>)}
            </div>
        </Navbar.Brand>
    );
}