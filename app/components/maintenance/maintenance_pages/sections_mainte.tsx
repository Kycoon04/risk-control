"use client";
import Link from 'next/link';
import { FaRegPlusSquare } from "react-icons/fa";
import { Section } from "@/types";
import SectionCard from "../maintenance_cards/section_card";
import { useEffect, useState } from "react";
import { deleteSection, fetchSections } from "../../actions/actions_sections/actions";
import Spinner from "../../notifications/Spinner";
import Filter from "../../utils_comp/filter";
import { Success,Error } from "../../notifications/alerts";
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/section_storage';
const SectionMaintenance: React.FC = () => {
    const param: Section = {
        id: "",
        name: "",
        description: "",
        forms: "",
        complete:"",
    };
    
    const [sections, setSections] = useState<Section[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [unfiltered, setUnfiltered] = useState<Section[]>([]);
    const [filters, setFilters] = useState<Partial<Section>>(param);
    const setSection = useAuthStore(state => state.setSection);

    const clearFilters = () => {
        setFilters(param);
        setSections(unfiltered);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedSections = await fetchSections(param);
            console.log(fetchedSections.props.data)
            setSections(fetchedSections.props.data);
            setUnfiltered(fetchedSections.props.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            const filteredLoggers = unfiltered.filter(item => {
                return Object.keys(filters).every(key => {
                    const filterValue = filters[key as keyof Section];
                    const itemValue = item[key as keyof Section];
                    
                    if (typeof filterValue === 'number' || typeof itemValue === 'number') {
                        const stringValue = String(filterValue).toLowerCase();
                        const itemStringValue = String(itemValue).toLowerCase();
                        return itemStringValue.includes(stringValue);
                    } else {
                        return itemValue.toLowerCase().includes((filterValue || "").toLowerCase());
                    }
                });
            });
            setSections(filteredLoggers);
        };
        applyFilters();
    }, [filters, unfiltered]);
    const handleDeleteSection = async (userId: string) => {
        console.log(userId)
        const deletionResult = await deleteSection(parseInt(userId, 10));

        if (deletionResult) {
            Success('Sección eliminado correctamente')
            const fetchedSections = await fetchSections(param);
            setSection(fetchedSections.props.data);
            setUnfiltered(fetchedSections.props.data);
        } else {
            Error('Error al intentar eliminar el sección');
        }
    };
    const handleModifySection = async (section: Section) => {
        setSection(section);
    };
    return (
        <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-2xl items-center justify-center'>
            <h2 className='text-2xl sm:text-center text-white text-center m-5'>
                Mantenimiento de Secciones
            </h2>
            <Filter<Section> filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
            <div className="bg-gray-200 w-full flex flex-wrap gap-5 rounded-md px-5 place-items-end mb-4">
                    <div className="w-full md:w-auto flex justify-start items-center">
                        <div className='bg-purple-400 flex  gap-3 md:gap-5 rounded-2xl text-white cursor-pointer mr-4 md:mr-12 place-items-end p-2 md:p-3 border-4 text-xs md:text-base' >
                            <Link href={'/home_page/maintenance/mainte_sections/sections_register'}>
                                <FaRegPlusSquare className="text-white font text-2xl md:text-4xl hover:text-slate-300" />
                            </Link>
                        </div>
                    </div>
            </div>
            {isLoading ? (
                <Spinner />) : (
                sections.map((section) => (
                    <SectionCard key={section.id} prompt_one="Nombre:" prompt_two="Id:" handleDeleteSection={handleDeleteSection} prompt_three="Completado:" handleModifySection={handleModifySection} {...section} />
                )))}
        </div>
    );
};
export default SectionMaintenance;