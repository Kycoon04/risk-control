"use client";
import { useAuthStore } from "@/provider/store";
import Preview_maintenance from "./preview_maintenance";
const Componente: React.FC = () => {
    const rol = useAuthStore(state => state.rol);
    let componentesAMostrar = [];

    if (rol?.some(role => role.name === "Soporte")) {
        componentesAMostrar.push(
            <Preview_maintenance titule='Usuarios' url="/home_page/maintenance/mainte_users" icon="RiUserSettingsFill"/>
        );
    }
    if (rol?.some(role => role.name === "Admi junior")) {
        componentesAMostrar.push(
            <>
                <Preview_maintenance titule='Formularios' url="/home_page/maintenance/mainte_forms" icon="SiGoogleforms"/>
                <Preview_maintenance titule='Secciones' url="/home_page/maintenance/mainte_sections" icon="SiGooglemarketingplatform"/>
                <Preview_maintenance titule='Preguntas' url="/home_page/maintenance/mainte_questions" icon="BsFillQuestionSquareFill"/>
            </>
        );
    } 
    if (rol?.some(role => role.name === "Admi senior")) {
        componentesAMostrar.push(
            <>
                <Preview_maintenance titule='Departamentos' url="/home_page/maintenance/mainte_depart" icon="FaNetworkWired"/>
                <Preview_maintenance titule='Roles' url="/home_page/maintenance/mainte_roles" icon="MdOutlineWorkOutline"/>
                <Preview_maintenance titule='Unidades' url="/home_page/maintenance/mainte_units" icon="BsBuildingsFill"/>
            </>
        );
    }

    return (
        <div className='bg-blue-1000 w-90vw md:w-90  sm:w-max m-10 rounded-md justify-center'>
            <h1 className="text-center text-4xl font-extrabold text-white m-10 mb-5">
                {'Mantenimiento'}
            </h1>
            <div className='m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
                {componentesAMostrar}
            </div>
        </div>
    );
}
export default Componente;