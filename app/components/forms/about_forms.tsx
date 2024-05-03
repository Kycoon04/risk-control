import React, { useState, useEffect } from "react";
import { fetchSections, fetchAnswers} from "../actions/actions";
import Spinner from "../notifications/Spinner";
import Preview_Section from "../sections/preview_section";
import { useAuthStore } from "@/provider/store";
import Barchart from '../graphics/Barchart';
import Radarchart from '../graphics/Radarchart';
import { Section,SectionXUser,graphicData,paramsSection, FormsXUser } from '@/types';
import {FecthAnswers} from '@/types';
import { fetchSectionXUser } from '../actions/actions_sectionxuser/actions';
import {fetchFormXUser,putFormsXUser} from '../actions/actions_formsxuser/actions';
const Componente: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const forms = useAuthStore((state) => state.form);
    const user = useAuthStore((state) => state.user);
    const [sections, setSections] = useState<Section[]>([]);
    const [Answers, setAnswers] = useState<FecthAnswers[]>([]);
    const [sectionxuser, setSectionxuser] = useState<SectionXUser[]>([]);
    const param: paramsSection = {
        id: "",
        forms: forms?.id?.toString(),
        name: "",
        description: "",
        complete: "",
    };
    const answer = {
        id: "",
        user: user?.id,
        option: "",
        TL_Options: {
            id: "",
            option: "",
            question: "",
            score: "",
            TL_Questions:{
                id: "",
                question:"",
                description:"",
                section:"",
            }
        },
    };
    const sectionXuser = {
        id:"",
        section:"",
        user:user?.id,
        complete:"",
    };
    const formsXuser = {
        id: "",
        Forms: forms?.id,
        User:user?.id,
        complete:"",
    }
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedSections = await fetchSections(param);
            setSections(fetchedSections.props.data);
            const fetchedAnswers = await fetchAnswers(answer)
            setAnswers(fetchedAnswers.props.data);
            const fetchedsectionxuser = await fetchSectionXUser(sectionXuser);
            setSectionxuser(fetchedsectionxuser.props.data); 
            const fecthedformsxuser = await fetchFormXUser(formsXuser);
            if(sections.every(section => sectionxuser.some(sxu => sxu.section === section.id && sxu.complete === 'Completado')) && fecthedformsxuser.props.data[0].complete !== "Completado"){
                formsXuser.complete = "Completado";
                console.log(formsXuser)
                await putFormsXUser(formsXuser);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const generateRandomData = () => {
            const sectionScores: { [section: string]: number[] } = {};
            Answers.forEach(answer => {
                const section = answer.TL_Options.TL_Questions.section;
                if (section) {
                    if (!sectionScores[section]) {
                        sectionScores[section] = [];
                    }
                    sectionScores[section].push(parseInt(answer.TL_Options.score, 10));
                }
            });
            const sectionAverages: number[] = [];
            for (const section in sectionScores) {
                if (sectionScores.hasOwnProperty(section)) {
                    const scores = sectionScores[section];
                    const sum = scores.reduce((acc, score) => acc + score, 0);
                    const average = sum / scores.length;
                    sectionAverages.push(average);
                }
            }
            return sectionAverages;
        };
    
        if (!isLoading && Answers.length > 0 && sections.length > 0) { // Verifica que todos los datos estén disponibles
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
    }, [isLoading, Answers, sections]);


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
                    sections.every(section => sectionxuser.some(sxu => sxu.section === section.id && sxu.complete === 'Completado')) ? (
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
                            <Preview_Section key={form.id} id={form.id} name={form.name} description={form.description} forms={form.forms} complete={sectionxuser.some(sxu => sxu.section === form.id && sxu.complete === 'Completado')
                                ? 'Completado'
                                : 'Sin Completar'
                        } />
                        ))
                    )
                )}
            </div>
        </div>
    );
};

export default Componente;
