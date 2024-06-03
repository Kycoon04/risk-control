"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Field from '@/app/components/utils_forms/Field';
import Standard_button from '@/app/components/utils_forms/Button';
import { registerValidation } from '@/lib/validation/registerValidation';
import PhoneNumberValidation from '@/app/components/utils_forms/International_Phone';
import ChoiseBox from '@/app/components/register/selectDepart';
import {ParamDepartment,Role} from '@/types';
import {fetchDepartment} from '@/app/components/actions/actions_departments/actions';
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/user_storage';
import {submitFormUser,comeBack,Departments} from '../users/maintenance_methods'
import {useRouter} from 'next/navigation';
const User_Form: React.FC = () => {
     const User = useAuthStore(state => state.user);
    const [loading, setLoading] = useState(true);
    const [id]=useState(User?.id);
    const [nickname, setNickname] = useState(User?.nickname);
    const [name, setName] = useState(User?.name);
    const [second_name, setSecond_name] = useState(User?.second_name);
    const [surname, setSurname] = useState(User?.surname);
    const [second_surname, setSecond_surname] = useState(User?.second_surname);
    const [email, setEmail] = useState(User?.email);
    const [phone_number, setPhone_number] = useState(User?.phone_number);
    const [identification, setIdentification] = useState(User?.identification);
    const [departments, setDepartments] = useState<ParamDepartment[]>([]);
    const [departmentId, setDepartmentId] = useState(User.department);
    const { handleSubmit, register, formState: { errors } } = registerValidation();
    const router = useRouter();
    useEffect(() => { if (User) {setLoading(false);} }, [User]);
    const submitForm = async () => {await submitFormUser(id,departmentId, name, second_name, surname, second_surname, email, identification, nickname, phone_number).then(()=>router.push('/home_page/maintenance/mainte_users/')); }
    useEffect(() => {
        const initialize = async () => {
            const fetchedDepartment = await fetchDepartment(Departments);
            setDepartments(fetchedDepartment.props.data);
        }; initialize();
    }, []);
    return (
        <><div className=' py-5 drop-shadow-lg m-1 flex flex-col items-center pr-7 pl-7' >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 w-full">
                <Field text_Field={name} setText_Field={setName} titule={'Nombre:'} type={"text"} register={register} error={errors.name} name={"name"}></Field>
                <Field text_Field={second_name} setText_Field={setSecond_name} titule={'Segundo nombre:'} type={"text"} register={register} error={errors.second_name} name={"second_name"}></Field>
                <Field text_Field={surname} setText_Field={setSurname} titule={'Primer apellido:'} type={"text"} register={register} error={errors.surname} name={"surname"}></Field>
                <Field text_Field={second_surname} setText_Field={setSecond_surname} titule={'Segundo apellido:'} type={"text"} register={register} error={errors.second_surname} name={"second_surname"}></Field>
                <Field text_Field={email} setText_Field={setEmail} titule={'Email:'} type={"text"} register={register} error={errors.email} name={"email"}></Field>
                <Field text_Field={identification} setText_Field={setIdentification} titule={'Cédula:'} type={"text"} register={register} error={errors.identification} name={"identification"}></Field>
                <Field text_Field={nickname} setText_Field={setNickname} titule={'Nombre de usuario:'} type={"text"} register={register} error={errors.nickname} name={"nickname"}></Field>
                <ChoiseBox data={departments} selectData={departmentId} onChange={setDepartmentId} titule="Departamento:"/>
                <PhoneNumberValidation phone={phone_number} setPhone={setPhone_number} register={register} error={errors.phone_number} name={"phone_number"} />
                <div className='items-center ml-14'>
                    <Link href={'/home_page/maintenance/mainte_users/users_form/select_roles'}>
                        <button  className='relative inline-flex  hover:bg-orange-600 my-3 p-2 w-[80%] justify-center text-white me-2 overflow-hidden text-sm font-medium rounded-sm group bg-orange-400 pr-8 pl-8'>Ver Roles</button>
                     </Link></div>
                 </div>
            <div className='grid grid-cols-2 md:grid-cols-2 gap-8 justify-center'>
                <div className='flex justify-center'>
                    <Link href={'/home_page/maintenance/mainte_users/'}><Standard_button fuction={comeBack} titule={"Regresar"} width={"350px"}></Standard_button></Link>
                </div>
                <div className='flex justify-center'>
                    <Link href={'/home_page/maintenance/mainte_users/'}><Standard_button fuction={handleSubmit(submitForm)} titule={"Guardar"} width={"350px"}></Standard_button></Link>
                </div>
            </div>
        </div></>
    );
}
export default User_Form;