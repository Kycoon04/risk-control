"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Field from './Field';
import Standard_button from './Button';
import { loginValidation } from '@/validationSchema/auth';
import { useRouter } from 'next/navigation';
import {config} from '@/Config';
import {PublicClientApplication} from '@azure/msal-browser';
import {Component} from 'react'

// Interface for login function (optional)
interface LoginProps {
    scopes?: string[]; // Optional scopes for login
  }
  
  const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
  
    // Create MSAL PublicClientApplication instance
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
  
    // Login function with optional scopes
    const login = async (props?: LoginProps) => {
        console.log(98888);
      try {
        const account = await publicClientApplication.loginPopup({
          scopes: props?.scopes || config.scopes, // Use default scopes or provided ones
          prompt: 'select_account',
        });
        setIsAuthenticated(true);
        console.log('Login successful:', account); // Log account details for debugging
      } catch (err) {
        console.error('Login error:', err); // Log error for debugging
        setIsAuthenticated(false);
      }
    };
  
    const logout = async () => {
      await publicClientApplication.logout();
    };
  
//const Header = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { handleSubmit, register, formState: { errors } } = loginValidation();
    const submitForm = () => {
        login().then(() => {
          if (isAuthenticated) {
            router.push("/home_page");
          } else {
            alert('Error Inicio de Sesión');
          }
        }).catch(error => console.error('Login error:', error));
      };
    //render(){
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