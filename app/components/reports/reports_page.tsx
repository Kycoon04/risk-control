"use client";
import ReportsCards from "./reports_cards";
import {handlerForms, handlerUsers, handlerDepartments, handlerQuestionsXsections} from '@/app/reports/handlers/handlers';


 const Componente: React.FC = () => {
    return (
        <div className='bg-blue-1000 w-90vw md:w-90  sm:w-max m-10 rounded-md justify-center'>
            <h1 className="text-center text-4xl font-extrabold text-white m-10 mb-5">
                {'Reportes Excel'}
            </h1>
            <div className='m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
                <ReportsCards title='Formularios' url="" icon="SiGoogleforms" callbackExcel={handlerForms}/>
                <ReportsCards title='Usuarios' url="" icon="TiUser" callbackExcel={handlerUsers}/>
                <ReportsCards title='Departamentos' url="" icon="FaNetworkWired" callbackExcel={handlerDepartments}/>
                <ReportsCards title='Preguntas por secciones' url="" icon="BsFillQuestionSquareFill" callbackExcel={handlerQuestionsXsections}/>
            </div>
        </div>
    );
}

export default Componente;