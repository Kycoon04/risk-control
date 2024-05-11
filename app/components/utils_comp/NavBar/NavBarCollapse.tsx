import { Navbar } from 'flowbite-react';
import {NavBarBrandSevri,NavBarBrandAutoevaluacion,NavBarBrandAccount} from './NavBarBrandCollapse';
import NavBarBrandDropDown from './NavBarBrandDropdown';
interface NavBarCollapseProps {
    isOpen: boolean;
    toggleDropdown: () => void;
    rol: string;
}
export default function NavBarCollapse({ isOpen, toggleDropdown, rol }: NavBarCollapseProps) {
    return (
        <Navbar.Collapse className="md:absolute md:right-10">
        <NavBarBrandSevri/>
        <NavBarBrandDropDown isOpen={isOpen} toggleDropdown={toggleDropdown} rol={rol}/>
        <NavBarBrandAutoevaluacion/>
        <NavBarBrandAccount/>
    </Navbar.Collapse>
    );
}