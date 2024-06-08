import React, { useEffect } from "react";
import Spinner from "../notifications/Spinner";
import { useGraphicData, useGraphicDataPie,UnitXCountDepart } from "./graphicData";
import { useDataPreparation } from "./utils";
import { useAuthStore } from "@/provider/store";
import Piechart from '../graphics/Pie'
import {  Department} from '@/types';
const ResponseAverage: React.FC = () => {
    const [pieData, setPieData] = useGraphicDataPie();
    const { isLoading, sections, Answers,units } = useDataPreparation();
    const forms = useAuthStore((state) => state.form);
    useEffect(() => {
        const listUnits = units.filter(unit => Answers.some(answer => answer.TL_Users.TL_Departaments.unit === unit.id));
        const generateRandomData = () => {
            const list: UnitXCountDepart[] = listUnits.map(unit => ({ unit, count: 0,}));
            const extractUniqueDepartments = (Answers: any[]):  Department[] => {
                const uniqueDepartmentMap: Map<string, Department> = new Map();
                Answers.forEach(answer => {
                    const depart:  Department = answer?.TL_Users?.TL_Departaments;
                    if (depart && !uniqueDepartmentMap.has(depart.id)) {
                        uniqueDepartmentMap.set(depart.id, depart);
                    }
                });
                return Array.from(uniqueDepartmentMap.values());
            };
            const departments = extractUniqueDepartments(Answers);
            departments.forEach(depart=>{
                list.forEach(unit =>{
                    if(unit.unit.id===depart.unit){
                        unit.count+=1;
                    }
                });
            });
            const departAverage: number[] = list.map(unit => unit.count);
            return departAverage;
        };
        if (!isLoading && Answers.length > 0 && listUnits.length > 0) { 
            const sectionNames: string[] = listUnits.map(unit => unit.name);
            setPieData(prevState => ({
                ...prevState,
                labels: sectionNames,
                datasets: [{
                    ...prevState.datasets[0],
                    data: generateRandomData(),
                }],
            }));
        }
    }, [isLoading, Answers,units,setPieData]);
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
