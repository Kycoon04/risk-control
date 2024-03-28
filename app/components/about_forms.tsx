"use client";
import Preview_Section from "./preview_section";
import {Form, useAuthStore} from "@/provider/store"
import React, { useState, useEffect } from "react";
import { fectSections } from "./actions";

const Componente: React.FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const forms = useAuthStore(state => state.form);
    const [sections, setSections] = useState<Form[]>([]);
    const param = {
        forms : 1,
        name : "",
        description : ""
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedSections = await fectSections(param);
            setSections(fetchedSections.props.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    console.log(sections)
    return (
        <div className='bg-blue-1000 w-90vw md:w-90 sm:w-[90%] m-10 rounded-md justify-center'>
            <h1 className="text-center text-4xl font-extrabold text-white m-10 mb-5">
                {'Modulo de madurez'}
            </h1>
            <div className='m-5'>
                <Preview_Section titule='Ambiente' percent={50} />
                <Preview_Section titule='Riesgos' percent={40} />
                <Preview_Section titule='Actividades' percent={75} />
                <Preview_Section titule='Sistemas' percent={50} />
                <Preview_Section titule='Seguimiento' percent={50} />
            </div>
        </div>
    );
}

export default Componente;