import React, { useEffect } from "react";
import { useGraphicData, useGraphicDataPie } from "./graphicData";
import { useDataPreparation } from "./utils";
import { useAuthStore } from "@/provider/store";
import ModuloMadurezSection from "./moduloMadurezSection";

const Componente: React.FC = () => {
    const [barData, setBarData] = useGraphicData();
    const { isLoading, sections, Answers } = useDataPreparation();
    const forms = useAuthStore((state) => state.form);

    useEffect(() => {
        const generateRandomData = () => {
            const sectionScores: { [section: string]: number[] } = {};
            Answers.forEach(answer => {
                const section = answer.TL_Options.TL_Questions.TL_Sections;
                if (section) {
                    if (!sectionScores[parseInt(section.id)]) {
                        sectionScores[parseInt(section.id)] = [];
                    }
                    sectionScores[parseInt(section.id)].push(parseInt(answer.TL_Options.score, 10));
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
        if (!isLoading && Answers.length > 0 && sections.length > 0) { 
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
    }, [isLoading, Answers, sections, setBarData]);

    return (
        <ModuloMadurezSection
            isLoading={isLoading}
            formsComplete={forms?.complete}
            barData={barData}
            sections={sections}
        />
    );
};

export default Componente;
