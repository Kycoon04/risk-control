"use client";
import { useState, useEffect } from 'react';
import { useAuthStore } from "@/provider/store";
import Preview_maintenance from "./preview_maintenance";
import Spinner from '../notifications/Spinner';
const Componente: React.FC = () => {
    const [rol, setRol] = useState<string[]>([]);
    const userRol = useAuthStore(state => state.rol);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        setIsLoading(true);
        if (userRol) {
            setRol(userRol.map(role => role.name));
        }
        setIsLoading(false);
    }, []);
    let componentesAMostrar = [];
    if (rol?.some(role => role === "Soporte")) {
        componentesAMostrar.push(
            <Preview_maintenance titule='Usuarios' url="/home_page/maintenance/mainte_users" icon="RiUserSettingsFill" />
        );
    }
    if (rol?.some(role => role === "Admi junior")) {
        componentesAMostrar.push(
            <>
                <Preview_maintenance titule='Formularios' url="/home_page/maintenance/mainte_forms" icon="SiGoogleforms" />
                <Preview_maintenance titule='Secciones' url="/home_page/maintenance/mainte_sections" icon="SiGooglemarketingplatform" />
                <Preview_maintenance titule='Preguntas' url="/home_page/maintenance/mainte_questions" icon="BsFillQuestionSquareFill" />
            </>
        );
    }
    if (rol?.some(role => role === "Admi senior")) {
        componentesAMostrar.push(
            <>
                <Preview_maintenance titule='Departamentos' url="/home_page/maintenance/mainte_depart" icon="FaNetworkWired" />
                <Preview_maintenance titule='Roles' url="/home_page/maintenance/mainte_roles" icon="MdOutlineWorkOutline" />
                <Preview_maintenance titule='Unidades' url="/home_page/maintenance/mainte_units" icon="BsBuildingsFill" />
            </>
        );
    }

    return (
        <div className='bg-blue-1000 w-90vw md:w-90  sm:w-max m-10 rounded-md justify-center'>
            <h1 className="text-center text-4xl font-extrabold text-white m-10 mb-5">
                {'Mantenimiento'}
            </h1>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className='m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
                    {componentesAMostrar}
                </div>
            )}

        </div>
    );
}
export default Componente;