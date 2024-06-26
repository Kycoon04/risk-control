"use client";
import Card from '../utils_comp/card'
import ResponseAverage from '../forms/responseAverage';
import DepartmentResponse from '../forms/departmentResponse'
import LevelObtained from '../forms/levelObtained'
import DepartmentsNotes from '../forms/departmentsNotes'
const Componente: React.FC = () => {
  return (
    <div className='bg-blue-1000 w-90vw md:w-90 sm:w-[90%] m-10 rounded-md'>
      <h1 className="text-center text-4xl font-extrabold text-white m-10 mb-5">
        {'Modulo de madurez'}
      </h1>
      <div className='flex flex-wrap md:flex-no-wrap md:justify-between justify-center'>
        <div className='bg-gray-200 w-30vw md:w-1/3 m-5 ml-10 p-5 rounded-2xl'>
          <p className='mb-4'>Notas por departamento</p>
          <DepartmentsNotes></DepartmentsNotes>
        </div>

        <div className='flex flex-wrap md:flex-1'>
          <div className='w-full md:w-[45%] m-5'>
            <div className="bg-gray-200 mb-5 p-5 rounded-2xl">
              <p className='text-center text-white'>Nivel obtenido</p>
              <LevelObtained></LevelObtained>
            </div>
            <div className="bg-gray-200 p-5 rounded-2xl">
              <p className='text-center text-white'>Cantidad de usuarios que respondieron por departamento</p>
              <DepartmentResponse></DepartmentResponse>
              <></>
            </div>
          </div>
          <div className='w-full md:w-[45%] m-5'>
            <div className="bg-gray-200 mb-5 p-5 rounded-2xl">
              <p className='text-center text-white'>Cantidad de Departamentos por Unidad</p>
              <ResponseAverage></ResponseAverage>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Componente;