"use client";
import { Form } from "@/provider/types";
import FormCard from "../maintenance_cards/form_card";
import { useEffect, useState } from "react";
import { deleteForms, fetchForms} from "../../actions/actions_forms/actions";
import Spinner from "../../notifications/Spinner";
import Filter from "../../utils_comp/filter";
import { Success,Error } from "../../notifications/alerts";

const FormsMaintenance: React.FC = () => {
    const param = {
        id: "",
        name: "",
        state: "",
        inicialperiod: "",
        finalperiod: "",
    };
    
    const [forms, setForms] = useState<Form[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [unfiltered, setUnfiltered] = useState<Form[]>([]);
    const [filters, setFilters] = useState<Partial<Form>>(param);

    const clearFilters = () => {
        setFilters(param);
        setForms(unfiltered);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedSections = await fetchForms();
            console.log(fetchedSections.props.data)
            setForms(fetchedSections.props.data);
            setUnfiltered(fetchedSections.props.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            const filteredLoggers = unfiltered.filter(item => {
                return Object.keys(filters).every(key => {
                    const filterValue = filters[key as keyof Form];
                    const itemValue = item[key as keyof Form];
                    if (typeof filterValue === 'number' || typeof itemValue === 'number') {
                        const stringValue = String(filterValue).toLowerCase();
                        const itemStringValue = String(itemValue).toLowerCase();
                        return itemStringValue.includes(stringValue);
                    }else {
                        return itemValue.toLowerCase().includes((filterValue || "").toLowerCase());
                    }
                });
            });
            setForms(filteredLoggers);
        };
        applyFilters();
    }, [filters, unfiltered]);
    const handleDeleteForm = async (userId: string) => {
        console.log(userId)
        const deletionResult = await deleteForms(parseInt(userId, 10));

        if (deletionResult) {
            Success('Formulario eliminado correctamente')
            const fetchedSections = await fetchForms();
            setForms(fetchedSections.props.data);
            setUnfiltered(fetchedSections.props.data);
        } else {
            Error('Error al intentar eliminar el formulario');
        }
    };
    return (
        <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-2xl items-center justify-center'>
            <h2 className='text-2xl sm:text-center text-white text-center m-5'>
                Mantenimiento de Formularios
            </h2>
            <Filter<Form> filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
            {isLoading ? (
                <Spinner />) : (
                forms.map((section) => (
                    <FormCard key={section.id} prompt_one="Nombre:" prompt_two="Id:" handleDeleteForm={handleDeleteForm} prompt_three="Completado:" {...section} />
                )))}
        </div>
    );
};
export default FormsMaintenance;