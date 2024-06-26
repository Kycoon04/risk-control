"use client";
import React, { useState, useEffect } from "react";
import PaginationBar from "./paginationBar";
import Preview_forms from "./preview_forms";
import Spinner from "../notifications/Spinner";
import { DepartXForms, paramsDepartXForms } from '@/types';
import { fetchDepartXForms } from '../actions/actions_deparxforms/actions';
import { useAuthStore } from "@/provider/store";
const Componente: React.FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [DepartXForms, setDepartXForms] = useState<DepartXForms[]>([]);
    const user = useAuthStore((state) => state.user);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 3;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = DepartXForms.slice(indexOfFirstItem, indexOfLastItem);

    const paramDepartxforms: paramsDepartXForms = {
        department: user?.department,
        forms: "",
        id: "",
    }
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fecteddeparxforms = await fetchDepartXForms(paramDepartxforms);
            setDepartXForms(fecteddeparxforms.props.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);
    const changePage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className='bg-blue-1000 w-90vw md:w-90 sm:w-[90%] m-10 rounded-md justify-center'>
            <h1 className="text-center text-4xl font-extrabold text-white m-10 mb-5">
                {'Formularios'}
            </h1>
            <div className='m-5'>
                {isLoading && <Spinner />}
                {!isLoading && (
                    currentItems.map(departXForm => {
                        return (
                            <Preview_forms key={departXForm.TL_forms.id} id={departXForm.TL_forms.id} state={departXForm.TL_forms.state} inicialperiod={departXForm.TL_forms.inicialperiod}
                                finalperiod={departXForm.TL_forms.finalperiod} name={departXForm.TL_forms.name} complete={departXForm.TL_forms.complete} url="/home_page/forms"
                            />
                        );
                    })
                )}
                <div className="flex justify-center">
                    <PaginationBar
                        forms={DepartXForms}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        changePage={changePage}
                    />
                </div>
            </div>
        </div>
    );
}
export default Componente;