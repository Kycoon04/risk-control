"use client"
import { useAuthStore } from '@/provider/store';
import { Navbar } from 'flowbite-react';
import { useState } from 'react';
import NavBarBrandInit from './NavBarBrandInit';
import NavBarCollapse from './NavBarCollapse';
export default function UserNavBar() {
    const rol = useAuthStore(state => state.rol);
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="container ">
            <Navbar fluid rounded className=" bg-transparent">
            <NavBarBrandInit/>
                <div className="flex md:order-2 m-5">
                    <Navbar.Toggle />
                </div>
                <NavBarCollapse isOpen={isOpen} toggleDropdown={toggleDropdown} rol={rol} />
            </Navbar>
        </div>

    )
}