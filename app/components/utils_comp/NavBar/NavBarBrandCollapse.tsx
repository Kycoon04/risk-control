import { Navbar } from 'flowbite-react';
import { FaUserAlt } from "react-icons/fa";
export function NavBarBrandSevri() {
    return (
        <Navbar.Brand>
            <div className="relative">
                <button
                    className="flex items-center justify-between w-full py-2 px-3 text-white rounded hover:text-purple-300 md:hover:bg-transparent md:border-0 md:hover:text-purple-300 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                    Sevri
                    <svg className="w-2.5 h-2.5 ms-2.5 transition-transform" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>
            </div>
        </Navbar.Brand>
    );
}

export function NavBarBrandAutoevaluacion() {
    return (
        <Navbar.Brand>
            <div className="relative">
                <button
                    className="flex items-center justify-between w-full py-2 px-3 text-white rounded hover:text-purple-300 md:hover:bg-transparent md:border-0 md:hover:text-purple-300 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                    Autoevaluación
                    <svg className='w-2.5 h-2.5 ms-2.5 transition-transform aria-hidden="true" xmlns="http://www.w3.org/2000/svg' fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>
            </div>
        </Navbar.Brand>
    );
}

export function NavBarBrandAccount() {
    return (
        <Navbar.Brand href="/home_page/account">
            <div className="relative">
                <button
                    className="flex items-center justify-between w-full py-2 px-3 text-white rounded hover:text-purple-300 md:hover:bg-transparent md:border-0 md:hover:text-purple-300 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                    <FaUserAlt className='text-2xl tex-white' />
                </button>
            </div>
        </Navbar.Brand>
    );
}
