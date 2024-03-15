"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Card from '../components/card'
export default function Home() {
  const router = useRouter();
  const submitForm = (values: any) => {
    console.log("form values", values)
    router.push("/")
  }
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-radial rounded-lg from-purple-500 via-purple-700 to-purple-1000">
      <div className='bg-blue-1000 w-90vw md:w-90 sm:w-[90%] m-10 rounded-md'>
        <h1 className="text-center text-4xl font-extrabold text-white m-10 mb-5">
          {'Modulo de madurez'}
        </h1>
        <div className='flex flex-wrap md:justify-between justify-center'>
          <Card image="/evaluation/image1.jpg" titule="Competente" subtitule='Ambiente de control' />
          <Card image="/evaluation/image2.jpg" titule="Competente" subtitule='Valoración de riesgo' />
          <Card image="/evaluation/image3.jpg" titule="Competente" subtitule='Actividades de control' />
          <Card image="/evaluation/image2.jpg" titule="Competente" subtitule='Sistemas de información' />
          <Card image="/evaluation/image3.jpg" titule="Competente" subtitule='Seg. Control interno' />
        </div>
        <div className='flex flex-wrap md:flex-no-wrap md:justify-between justify-center'>
          <div className='bg-gray-200 w-30vw md:w-1/3 m-5 ml-10 p-5 rounded-2xl'>
            <p>Promedio de respuestas</p>
          </div>

          <div className='flex flex-wrap md:flex-1'>
            <div className='w-full md:w-[45%] m-5'>
              <div className="bg-gray-200 mb-5 p-5 rounded-2xl">
                <p className='text-center'>Promedio de respuestas</p>
              </div>
              <div className="bg-gray-200 mb-5 p-5 rounded-2xl">
                <p className='text-center'>Por sección</p>
              </div>
            </div>
            <div className='w-full md:w-[45%] m-5'>
              <div className="bg-gray-200 mb-5 p-5 rounded-2xl">
                <p className='text-center'>Nivel obtenido</p>
              </div>
              <div className="bg-gray-200 mb-5 p-5 rounded-2xl">
                <p className='text-center'>Por departamento</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </main>
  );
}