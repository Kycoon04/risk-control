"use client";
import React, { useState, useEffect } from "react";
import Preview_forms from "./preview_forms";
import { fetchForms } from "../actions/actions";
import Spinner from "../notifications/Spinner";
import { Form, FormsXUser } from '@/provider/types';
import { fetchFormXUser } from '../actions/actions_formsxuser/actions';
import { useAuthStore } from "@/provider/store";
const Componente: React.FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [forms, setForms] = useState<Form[]>([]);
    const [FormsXuser, setFormsXuser] = useState<FormsXUser[]>([]);
    const Forms = useAuthStore((state) => state.form);
    const user = useAuthStore((state) => state.user);
    const formsXuser = {
        id: "",
        Forms: "",
        User: user?.id,
        complete: "",
    }
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedForms = await fetchForms();
            setForms(fetchedForms.props.data);
            const fecthedformsxuser = await fetchFormXUser(formsXuser);
            setFormsXuser(fecthedformsxuser.props.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);
    return (
        <div className='bg-blue-1000 w-90vw md:w-90 sm:w-[90%] m-10 rounded-md justify-center'>
            <h1 className="text-center text-4xl font-extrabold text-white m-10 mb-5">
                {'Formularios'}
            </h1>
            <div className='m-5'>
                {isLoading && <Spinner />}
                {!isLoading && (
                    forms.map(form => {
                        const formXuserData = FormsXuser.find(fxu => fxu.Forms === form.id);
                        const complete = formXuserData?.complete || "Sin completar";
                        return (
                            <Preview_forms key={form.id} id={form.id} state={form.state} inicialperiod={form.inicialperiod}
                                finalperiod={form.finalperiod} name={form.name} complete={complete} url="/home_page/forms"
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default Componente;