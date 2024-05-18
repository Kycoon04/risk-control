import React, { useEffect,useState } from "react";
import { useGraphicData, useGraphicDataPie } from "./graphicData";
import { useDataPreparation } from "./utils";
import { useAuthStore } from "@/provider/store";
import ModuloMadurezSection from "./moduloMadurezSection";

const LevelObtained: React.FC = () => {
    const [barData, setBarData] = useGraphicData();
    const { isLoading, sections, Answers } = useDataPreparation();
    const [level, setLevel] = useState('');
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
            const total: number = sectionAverages.reduce((acc, average) => acc + average, 0)/sectionAverages.length;
            console.log("NUMERROOOO "+ total);
            return total;
        };
        if (!isLoading && Answers.length > 0 && sections.length > 0) { 
            const level = generateRandomData();
            const levelMap = [
                { min: 0, max: 20, label: 'Incipiente' },
                { min: 20, max: 40, label: 'Novato' },
                { min: 40, max: 60, label: 'Competente' },
                { min: 60, max: 80, label: 'Diestro' },
                { min: 80, max: 100, label: 'Experto' }
            ];
            const matchedLevel = levelMap.find(range => level >= range.min && level < range.max);
            if (matchedLevel) {
                setLevel(matchedLevel.label);
            }
        }
    }, [isLoading, Answers, sections, setBarData]);

    return (
        <p className="text-3xl text-center font-bold tracking-tight text-green sm:text-4xl underline decoration-white">{level}</p>
    );
};

export default LevelObtained;