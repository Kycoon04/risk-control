import React, { useEffect } from "react";
import Spinner from "../notifications/Spinner";
import { useGraphicData, useGraphicDataPie } from "./graphicData";
import { useDataPreparation } from "./utils";
import { useAuthStore } from "@/provider/store";
import Piechart from '../graphics/Pie'

const ResponseAverage: React.FC = () => {
    const [pieData, setPieData] = useGraphicDataPie();
    const { isLoading, sections, Answers } = useDataPreparation();
    const forms = useAuthStore((state) => state.form);
    useEffect(() => {
        const generateRandomData = () => {
            const numberResponse: { [section: string]: number } = {};
            const extractUniqueSections = (Answers: any[]): string[] => {
                const uniqueSectionsSet: Set<string> = new Set();
                Answers.forEach(answer => {
                    const section = answer?.TL_Options?.TL_Questions?.TL_Sections;
                    if (section) {
                        uniqueSectionsSet.add(section.name);
                    }
                });
                return Array.from(uniqueSectionsSet);
            };
            const sections = extractUniqueSections(Answers);
            const sectionAverages: number[] = [];
            sections.map(section => {
                let count = 0;
                Answers.forEach(answer => {
                    if (answer?.TL_Options?.TL_Questions?.TL_Sections.name === section) {
                        count += 1;
                    }
                });
                sectionAverages.push(count);
            });
            return sectionAverages;
        };
        if (!isLoading && Answers.length > 0 && sections.length > 0) { 
            const sectionNames: string[] = sections.map(section => section.name);
            setPieData(prevState => ({
                ...prevState,
                labels: sectionNames,
                datasets: [{
                    ...prevState.datasets[0],
                    data: generateRandomData(),
                }],
            }));
        }
    }, [isLoading, Answers, sections,setPieData]);
    return (
        <div>
        {isLoading ? (
            <Spinner />
        ) : (
            <Piechart data={pieData}/>
        )}
        </div>
    );
};
export default ResponseAverage;
