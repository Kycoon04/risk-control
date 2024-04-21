"use client";
import Preview_maintenance from "./preview_maintenance";
const Componente: React.FC = () => {
    return (
        <div className='bg-blue-1000 w-90vw md:w-90  sm:w-max m-10 rounded-md justify-center'>
            <h1 className="text-center text-4xl font-extrabold text-white m-10 mb-5">
                {'Mantenimiento'}
            </h1>
            <div className='m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
                <Preview_maintenance titule='Formularios' url="/home_page/maintenance/mainte_forms" icon="SiGoogleforms"/>
                <Preview_maintenance titule='Secciones' url="/home_page/maintenance/mainte_sections" icon="SiGooglemarketingplatform"/>
                <Preview_maintenance titule='Preguntas' url="/home_page/maintenance/mainte_questions" icon="BsFillQuestionSquareFill"/>
                <Preview_maintenance titule='Usuarios' url="/home_page/maintenance/mainte_users" icon="RiUserSettingsFill"/>
                <Preview_maintenance titule='Departamentos' url="/home_page/maintenance/mainte_depart" icon="FaNetworkWired"/>
                <Preview_maintenance titule='Roles' url="/home_page/maintenance/mainte_roles" icon="MdOutlineWorkOutline"/>
            </div>
        </div>
    );
}

export default Componente;