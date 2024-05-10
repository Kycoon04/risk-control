import { Navbar } from 'flowbite-react';

export default function NavBarBrand() {
    return (
        <Navbar fluid rounded className=" bg-transparent">
            <Navbar.Brand href="/">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between  p-4">
                    <div className="text-white items-center mx-8">
                        <h1 className=" text-5xl font-semibold">SCI</h1>
                        <p className="text-sm font-light">Sistema Control Interno</p>
                    </div>
                </div>
            </Navbar.Brand>
        </Navbar>
    );
}