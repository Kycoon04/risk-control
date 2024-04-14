import React, { useState, useEffect } from "react";
import { fetchSections, fetchAnswers, Answers,fetchOptions } from "./actions";
import Spinner from "./Spinner";
import Preview_Section from "./preview_section";
import { Section, useAuthStore, graphicData,Options } from "@/provider/store";
import Barchart from './graphics/Barchart';
import Radarchart from './graphics/Radarchart';

const Componente: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const forms = useAuthStore((state) => state.form);
    const user = useAuthStore((state) => state.user);
    const [sections, setSections] = useState<Section[]>([]);
    const [Answers, setAnswers] = useState<Answers[]>([]);
    const [allOptions, setAllOptions] = useState<Options[]>([]);
    const [ListaUnit, setListaUnit] = useState<Options[]>([]);
    const param = {
        id: "",
        forms: forms?.id,
        name: "",
        description: "",
        complete: "",
    };
    const answer = {
        id: "",
        user: user?.id,
        option: "",
    };
    const options = {
        id: "",
        option: "",
        question: "",
        score: "",
    };
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedSections = await fetchSections(param);
            setSections(fetchedSections.props.data);
            const fetchedAnswers = await fetchAnswers(answer)
            setAnswers(fetchedAnswers.props.data);
            const userOptions = await fetchOptions(options);
            setAllOptions(userOptions.props.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const generateRandomData = () => {
            const data: number[] = [];
            const nuevaLista = allOptions.filter(option => {
                return Answers.some(answer => answer.option === option.id);
            });
            for (let i = 0; i < nuevaLista.length; i += 4) {
                let sum = 0;
                for (let j = 0; j < 4; j++) {
                    sum += parseInt(nuevaLista[i + j].score, 10);
                }
                data.push(sum / 4);
            }
            console.log(data)
            return data;
        };

        if (!isLoading) { // Solo generar los datos cuando isLoading es false
            const sectionNames: string[] = sections.map(section => section.name);
            setBarData(prevState => ({
                ...prevState,
                labels: sectionNames,
                datasets: [{
                    ...prevState.datasets[0],
                    data: generateRandomData(),
                }],
            }));
        }
    }, [isLoading, Answers, allOptions, sections]);

    const [barData, setBarData] = useState<graphicData>({
        labels: [],
        datasets: [
            {
                label: 'Nota de las secciones',
                backgroundColor: 'rgba(58, 29, 99,0.6)',
                borderColor: '#3a1d63',
                borderWidth: 0.5,
                hoverBackgroundColor: 'rgba(58, 29, 99, 0.4)',
                hoverBorderColor: '#fff',
                pointBackgroundColor: 'white', // Cambiar el color de los puntos a blanco
                pointBorderColor: 'white', // Cambiar el color del borde de los puntos a blanco
                pointHoverBackgroundColor: 'white', // Cambiar el color de los puntos al pasar el cursor a blanco
                pointHoverBorderColor: 'white',
                borderDash: [],
                data: [],
            },
        ],
    });
    return (
        <div className="bg-blue-1000 w-90vw md:w-90 sm:w-[90%] m-10 rounded-md justify-center">
            <h1 className="text-center text-4xl font-extrabold text-white m-10 mb-5">
                Modulo de madurez
            </h1>
            <div className="m-5">
                {isLoading ? (
                    <Spinner />
                ) : (
                    sections.every(section => section.complete === "Completado") ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
                            <div className="w-full sm:h-96 flex justify-center items-center">
                                <Barchart data={barData} />
                            </div>
                            <div className="w-full sm:h-96 flex justify-center items-center">
                                <Radarchart data={barData} />
                            </div>
                        </div>
                    ) : (
                        sections.map((form) => (
                            <Preview_Section key={form.id} id={form.id} name={form.name} description={form.description} forms={form.forms} complete={form.complete} />
                        ))
                    )
                )}
            </div>
        </div>
    );
};

export default Componente;
