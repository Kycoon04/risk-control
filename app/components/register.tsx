"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Field from './Field';
import Standard_button from './Button';
import { registerValidation } from '@/validationSchema/auth';
import { useRouter } from 'next/navigation';
import PhoneNumberValidation from './International_Phone';
import {postUser} from './actions'

const Header = () => {
    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');
    const [second_name, setSecond_name] = useState('');
    const [surname, setSurname] = useState('');
    const [second_surname, setSecond_surname] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [identification, setIdentification] = useState('');
    const [department, setDepartment] = useState('');
    const [password, setPassword] = useState('');
    const [cfn_password, setCfn_password] = useState('');
    const { handleSubmit, register, formState: { errors } } = registerValidation();
    const router = useRouter();

    const submitForm = async () => {
        if(await postUser(name,second_name,surname,second_surname,email,identification,nickname,phone_number)){
            alert('Usuario registrado')
            router.push("/home_page");
        }else{
            alert('Error de registro');
        }
    }

    return (
        <div className='bg-gray-200 rounded-3xl py-5 drop-shadow-lg m-11 flex flex-col items-center pr-7 pl-7'>
            <div className="flex justify-center bg-gray-100 rounded-full mb-5">
                <Image className='m-6' src='/login/userbasic.png' alt="Screenshots of the dashboard " width={60} height={60} />
            </div>
            <h2 className="text-center text-3xl font-semibold text-white">
                {'Inicio de sesión'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 w-full">
                <Field text_Field={name} setText_Field={setName} titule={'Nombre:'} type={"text"} register={register} error={errors.name} name={"name"}></Field>
                <Field text_Field={second_name} setText_Field={setSecond_name} titule={'Segundo nombre:'} type={"text"} register={register} error={errors.second_name} name={"second_name"}></Field>
                <Field text_Field={surname} setText_Field={setSurname} titule={'Primer apellido:'} type={"text"} register={register} error={errors.surname} name={"surname"}></Field>
                <Field text_Field={second_surname} setText_Field={setSecond_surname} titule={'Segundo apellido:'} type={"text"} register={register} error={errors.second_surname} name={"second_surname"}></Field>
                <Field text_Field={email} setText_Field={setEmail} titule={'Email:'} type={"text"} register={register} error={errors.email} name={"email"}></Field>
                <Field text_Field={identification} setText_Field={setIdentification} titule={'Cédula:'} type={"text"} register={register} error={errors.identification} name={"identification"}></Field>
                <Field text_Field={nickname} setText_Field={setNickname} titule={'Nombre de usuario:'} type={"text"} register={register} error={errors.nickname} name={"nickname"}></Field>
                <PhoneNumberValidation phone={phone_number} setPhone={setPhone_number} register={register} error={errors.phone_number} name={"phone_number"} />
            </div>
            <Standard_button fuction={handleSubmit(submitForm)} titule={"Crear cuenta"} width={"350px"}></Standard_button>
        </div>
    );

}
//<Field text_Field={password} setText_Field={setPassword} titule={'Contraseña:'} type={"Password"} register={register} error={errors.password} name={"password"}></Field>
//<Field text_Field={cfn_password} setText_Field={setCfn_password} titule={'Confirmar contraseña:'} type={"Password"} register={register} error={errors.cnfPassword} name={"cnfPassword"}></Field> 
export default Header;