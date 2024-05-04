"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Field from '@/app/components/utils_forms/Field';
import Field_Disabled from '@/app/components/utils_forms/Field_Disabled';
import Standard_button from '@/app/components/utils_forms/Button';
import { changeState } from '@/validationSchema/auth';
import { postUpdateRole} from '@/app/components/actions/actions_roles/actions'
import { Error,Success } from '@/app/components/notifications/alerts';
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/role_storage';
import { Truculenta } from 'next/font/google';
const Rol_Form: React.FC = () => {
     const Role = useAuthStore(state => state.role);
    const [loading, setLoading] = useState(true);
    const [id,setId]=useState(Role?.id);
    const [name, setName] = useState(Role?.name);
    const [active, setActive] = useState(Role?.active);

    const { handleSubmit, register, formState: { errors } } = changeState();
    useEffect(() => {
        if (Role) {
            setLoading(false);
        }
    }, [Role]);
    const submitForm = async () => {
        try {
            const role = await postUpdateRole(id, name,active);
            if (true) {
              Success('Rol actualizado');
            } else {
              console.log('Error de registro');
              Error("Error de registro");
            }
          } catch (error) {
            console.error('Error:', error);
            Error("Error de registro");
          }
    }
    const comeBack = async () => { }
    return (
        <div className=' py-5 drop-shadow-lg m-1 flex flex-col items-center pr-7 pl-7' >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 w-full">
                <Field_Disabled text_Field={id} setText_Field={setId} titule={'Id:'} type={"text"} register={register} error={errors.id} name={"id"}></Field_Disabled>
                <Field text_Field={name} setText_Field={setName} titule={'Nombre:'} type={"text"} register={register} error={errors.name} name={"name"}></Field>
                <Field text_Field={active} setText_Field={setActive} titule={'Estado:'} type={"text"} register={register} error={errors.active} name={"active"}></Field>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-2 gap-8 justify-center'>
                <div className='flex justify-center'>
                    <Link href={'/home_page/maintenance/mainte_roles/'}>
                        <Standard_button fuction={comeBack} titule={"Regresar"} width={"350px"}></Standard_button>
                    </Link>
                </div>
                <div className='flex justify-center'>
                    <Standard_button fuction={handleSubmit(submitForm)} titule={"Guardar"} width={"350px"}></Standard_button>
                </div>
            </div>
        </div>
    );
}
export default Rol_Form;