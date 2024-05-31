"use client";
import Link from 'next/link';
import { Form } from "@/types";
import PaginationBar from "../paginationBar";
import { FaRegPlusSquare } from "react-icons/fa";
import FormCard from "../maintenance_cards/form_card";
import { useEffect, useState } from "react";
import { deleteForms, fetchForms } from "../../actions/actions_forms/actions";
import Spinner from "../../notifications/Spinner";
import Filter from "../../utils_comp/Filters/filter";
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/form_storage';
import { param, filtered, stateDeleted, updateData } from '../maintenance_pages/methods_pages/forms_methods'
const FormsMaintenance: React.FC = () => {
    const [forms, setForms] = useState<Form[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [unfiltered, setUnfiltered] = useState<Form[]>([]);
    const [filters, setFilters] = useState<Partial<Form>>(param);
    const setForm = useAuthStore(state => state.setForm);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 4;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = forms.slice(indexOfFirstItem, indexOfLastItem);
    const clearFilters = () => { setFilters(param); setForms(unfiltered); };
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedSections = await fetchForms();
            updateData(setForms, setUnfiltered, fetchedSections);
            setIsLoading(false);
        }; fetchData();
    }, []);
    useEffect(() => {
        const applyFilters = () => {
            const filteredLoggers = filtered(unfiltered, filters);
            setForms(filteredLoggers);
        }; applyFilters();
    }, [filters, unfiltered]);
    const handleDeleteForm = async (userId: string) => {
        const deletionResult = await deleteForms(parseInt(userId, 10));
        stateDeleted(deletionResult, setForms, setUnfiltered);
    };
    const handleModifyForm = async (form: Form) => { setForm(form); };
    const changePage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-2xl items-center justify-center'>
            <h2 className='text-2xl sm:text-center text-white text-center m-5'> Mantenimiento de Formularios </h2>
            <Filter<Form> filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
            <div className="bg-gray-200 w-full flex flex-wrap gap-5 rounded-md px-5 place-items-end mb-4">
                <div className="w-full md:w-auto flex justify-start items-center">
                    <div className='bg-purple-400 flex  gap-3 md:gap-5 rounded-2xl text-white cursor-pointer mr-4 md:mr-12 place-items-end p-2 md:p-3 border-4 text-xs md:text-base' >
                        <Link href={'/home_page/maintenance/mainte_forms/forms_register'}>
                            <FaRegPlusSquare className="text-white font text-2xl md:text-4xl hover:text-slate-300" />
                        </Link>
                    </div>
                </div>
            </div>
            {isLoading ? (
                <Spinner />) : (
                currentItems.map((form) => (
                    <FormCard key={form.id} prompt_one="Nombre:" prompt_two="Id:" handleDeleteForm={handleDeleteForm} prompt_three="Condición:" handleModifyForm={handleModifyForm}{...form} />
                )))}
            <div className="flex justify-center">
                <PaginationBar
                    maintenance={forms}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    changePage={changePage}
                />
            </div>
        </div>
    );
};
export default FormsMaintenance;