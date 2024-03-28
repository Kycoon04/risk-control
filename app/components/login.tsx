"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import Standard_button from './Button';
import { useRouter } from 'next/navigation';
import { PublicClientApplication } from '@azure/msal-browser';
import { config } from '@/Config';

interface LoginProps {
  scopes?: string[];
}

const publicClientApplication = new PublicClientApplication({
  auth: {
    clientId: config.appId,
    redirectUri: config.redirectUri,
    authority: config.authority,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true,
  },
});

const App: React.FC = () => {
  const router = useRouter();
  let  isAuthenticated = false;
  useEffect(() => {
    const initializeMsal = async () => {
      try {
        await publicClientApplication.initialize();
      } catch (err) {
        console.error('MSAL initialization error:', err);
      }
    };
    initializeMsal();
  }, []);

  const login = async (props?: LoginProps) => {
    try {
      const account = await publicClientApplication.loginPopup({
        scopes: props?.scopes || config.scopes,
        prompt: 'select_account',
      });
      isAuthenticated = true;
      console.log('Login successful:', account);
    } catch (err) {
      console.error('Login error:', err);
      isAuthenticated = false;
    }
  };

  const logout = async () => {
    await publicClientApplication.logout();
  };

  const submitForm = async () => {
    try {
      await login();
      if (isAuthenticated) {
        router.push("/home_page");
      } else {
        console.log(isAuthenticated)
        alert('Error Inicio de Sesión aaaaaa');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
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
  );
}

export default App;