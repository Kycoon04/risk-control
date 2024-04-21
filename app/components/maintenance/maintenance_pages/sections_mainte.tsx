"use client";
import { Section,paramsSection } from "@/provider/types";
import SectionCard from "../maintenance_cards/section_card";
import { useEffect, useState } from "react";
import { fetchSections } from "../../actions/actions_sections/actions";
import Spinner from "../../notifications/Spinner";
import Filter from "../../utils_comp/filter";

const SectionMaintenance: React.FC = () => {
    const param = {
        id: "",
        name: "",
        description: "",
        forms: "",
        complete:"",
    };
    
    const [sections, setSection] = useState<Section[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [unfiltered, setUnfiltered] = useState<Section[]>([]);
    const [filters, setFilters] = useState<Partial<Section>>(param);

    const clearFilters = () => {
        setFilters(param);
        setSection(unfiltered);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedSections = await fetchSections(param);
            console.log(fetchedSections.props.data)
            setSection(fetchedSections.props.data);
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
            setSection(filteredLoggers);
        };
        applyFilters();
    }, [filters, unfiltered]);

    return (
        <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-2xl items-center justify-center'>
            <h2 className='text-2xl sm:text-center text-white text-center m-5'>
                Mantenimiento de Secciones
            </h2>
            <Filter<Section> filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
            {isLoading ? (
                <Spinner />) : (
                sections.map((section) => (
                    <SectionCard key={section.id} prompt_one="Nombre:" prompt_two="Id:" prompt_three="Completado:" {...section} />
                )))}
        </div>
    );
};
export default SectionMaintenance;