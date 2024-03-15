"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Field from './Field';
import Standard_button from './Button';
import { loginValidation } from '@/validationSchema/auth';
import { useRouter } from 'next/navigation';
const Header = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { handleSubmit, register, formState: { errors } } = loginValidation();
    const router = useRouter();
    const submitForm = (values: any) => {
        console.log("form values", values)
        router.push("/home_page")
    }
    return (
        <div className='bg-gray-200 rounded-3xl py-5 drop-shadow-lg m-11 flex flex-col items-center pr-7 pl-7'>
            <div className="flex justify-center bg-gray-100 rounded-full mb-5">
                <Image className='m-6' src='/login/userbasic.png' alt="Screenshots of the dashboard " width={60} height={60} />
            </div>
            <h2 className="text-center text-3xl font-semibold text-white">
                {'Inicio de sesión'}
            </h2>
            <div className="flex flex-col items-center my-4 w-full">
                <Field text_Field={username} setText_Field={setUsername} titule={'Email:'} type={"text"} register={register} error={errors.email} name={"email"}></Field>

                <Field text_Field={password} setText_Field={setPassword} titule={'Password:'} type={"Password"} register={register} error={errors.password} name={"password"}></Field>
                <Standard_button fuction={handleSubmit(submitForm)} titule={"Iniciar sesión"} width={"350px"}></Standard_button>
            </div>
        </div>
    );

}
export default Header;