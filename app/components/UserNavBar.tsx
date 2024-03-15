"use client"
import { Navbar, Button } from 'flowbite-react';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
export default function UserNavBar() {
    const router = useRouter();
    const handleClick = () => {
        router.push("/user");
    }
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="container ">
        <Navbar fluid rounded className=" bg-transparent">
            <Navbar.Brand href="/" >
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between  p-4">
                    <div className="text-white items-center mx-8">
                        <h1 className=" text-5xl font-semibold">SCI</h1>
                        <p className="text-sm font-light">Sistema Control Interno</p>
                    </div>
                </div>
            </Navbar.Brand>
            <div className="flex md:order-2 m-5">
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse className="md:absolute md:right-10">
                <Navbar.Brand>
                    <div className="relative">
                        <button
                            className="flex items-center justify-between w-full py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-300 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                            Sevri
                            <svg className="w-2.5 h-2.5 ms-2.5 transition-transform" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                    </div>
                </Navbar.Brand>
                <Navbar.Brand className="hover:bg-transparent hover:text-black">
                    <div className="relative hover:text-black">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center justify-between w-full py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-300 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
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
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                    </li>
                                    <li>
                                        <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                    </li>
                                </ul>
                                <div className="py-1">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"> Sign out</a>
                                </div>
                            </div>)}
                    </div>
                </Navbar.Brand>
                <Navbar.Brand>
                    <div className="relative">
                        <button
                            className="flex items-center justify-between w-full py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-300 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                            Autoevaluación
                            <svg className='w-2.5 h-2.5 ms-2.5 transition-transform aria-hidden="true" xmlns="http://www.w3.org/2000/svg' fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                    </div>
                </Navbar.Brand>
            </Navbar.Collapse>
        </Navbar>
    </div>
    
    )
}