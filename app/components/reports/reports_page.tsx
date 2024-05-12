"use client";
import ReportsCards from "./reports_cards";
import {handlerForms, handlerUsers, handlerDepartments, handlerQuestionsXsections} from '@/app/reports/handlers/handlers';
import { useAuthStore } from '@/provider/store';


 const Componente: React.FC = () => {
    const userName : string = useAuthStore(state => state.user?.name)??'Admin User';
    return (
        <div className='bg-blue-1000 w-90vw md:w-90  sm:w-max m-10 rounded-md justify-center'>
            <h1 className="text-center text-4xl font-extrabold text-white m-10 mb-5">
                {'Reportes Excel'}
            </h1>
            <div className='m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
                <ReportsCards title='Formularios' url="" icon="SiGoogleforms" callbackExcel={()=>handlerForms(userName)}/>
                <ReportsCards title='Usuarios' url="" icon="TiUser" callbackExcel={()=>handlerUsers(userName)}/>
                <ReportsCards title='Departamentos' url="" icon="FaNetworkWired" callbackExcel={()=>handlerDepartments(userName)}/>
                <ReportsCards title='Preguntas por secciones' url="" icon="BsFillQuestionSquareFill" callbackExcel={()=>handlerQuestionsXsections(userName)}/>
            </div>
        </div>
    );
}

export default Componente;