"use client";
import React from 'react';
import Image from 'next/image';
import Standard_button from '../utils_forms/Button';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import { Error } from '../notifications/alerts';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthentication } from './loginFunction';
interface LoginProps {
  scopes?: string[];
}

const App: React.FC = () => {
  const router = useRouter();
  const { login} = useAuthentication();

  const submitForm = async () => {
    try {
      const isAuthenticated = await login();
      if (isAuthenticated) {
        router.push("/home_page");
      } else {
        Error("No se pudo iniciar sesión. Por favor intente de nuevo.");
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <div className='bg-gray-200 rounded-3xl py-5 drop-shadow-lg m-11 flex flex-col items-center pr-7 pl-7'>
        <div className="flex justify-center bg-gray-100 rounded-full mb-5">
          <Image className='m-6' src='/login/userbasic.png' alt="Screenshots of the dashboard " width={60} height={60} />
        </div>
        <h2 className="text-center text-3xl font-semibold text-white">
          {'Inicio de sesión'}
        </h2>
        <div className="flex flex-col items-center my-4 w-full">
          <Standard_button fuction={submitForm} titule={"Iniciar sesión"} width={"350px"}></Standard_button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
export default App;