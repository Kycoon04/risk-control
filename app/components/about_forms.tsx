import React, { useState, useEffect } from "react";
import { fectSections } from "./actions";
import Spinner from "./Spinner";
import Preview_Section from "./preview_section";
import { Section, useAuthStore } from "@/provider/store";

const Componente: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const forms = useAuthStore((state) => state.form);
    const [sections, setSections] = useState<Section[]>([]);

    const param = {
        id: "",
        forms: forms?.id,
        name: "",
        description: "",
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedSections = await fectSections(param);
            setSections(fetchedSections.props.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);
    return (
        <div className="bg-blue-1000 w-90vw md:w-90 sm:w-[90%] m-10 rounded-md justify-center">
            <h1 className="text-center text-4xl font-extrabold text-white m-10 mb-5">
                Modulo de madurez
            </h1>
            <div className="m-5">
                {isLoading ? (
                    <Spinner />
                ) : (
                    sections.map((form) => (
                        <Preview_Section key={form.id} id={form.id} name={form.name} description={form.description} forms={form.forms} complete="Sin completar" />
                    ))
                )}
            </div>
        </div>
    );
};

export default Componente;
