"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Field from './components/Field';
import Standard_button from './components/Button';
import { useRouter } from 'next/navigation';
import  { loginValidation} from '@/validationSchema/auth';

export default function Home() {

  const logOut = () => {}
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { handleSubmit, register, formState: { errors } } = loginValidation();


  const submitForm = (values: any) => {
    console.log("form values", values)
  }
  return (
    <main className="flex min-h-screen flex-col p-4 items-center bg-gradient-radial rounded-lg from-purple-500 via-purple-700 to-purple-1000">
      <div className='bg-gray-200 rounded-3xl py-5 drop-shadow-lg m-11 flex flex-col items-center w-[30%]'>
        <div className="flex justify-center bg-gray-100 rounded-full mb-5">
          <Image className='m-6' src='/login/userbasic.png' alt="Screenshots of the dashboard " width={60} height={60} />
        </div>
        <h2 className="text-center text-3xl font-semibold text-white">
          {'Login'}
        </h2>
        <p className="mt-5 text-center text-sm text-black dark:text-white">
          {'¿No tienes una cuenta aún?'} {'  '}
          <Link href="/register" className="font-medium text-purple-300 hover:text-purple-1000">
            {'Registrate'}
          </Link>
        </p>
        <div className="flex flex-col items-center my-4 w-full">
          <Field text_Field={username} setText_Field={setUsername} titule={'Email:'} type={"text"} register={register} error={errors.email} name={"email"}></Field>

          <Field text_Field={password} setText_Field={setPassword} titule={'Password:'} type={"Password"} register={register} error={errors.password} name={"password"}></Field>
          <Standard_button fuction={handleSubmit(submitForm)} titule={"Login"} width={"350px"}></Standard_button>
        </div>
      </div>
    </main>
  );
}