import React, { useEffect } from "react";
import Spinner from "../notifications/Spinner";
import { useGraphicData, useGraphicDataPie,DepartXCountAnswer} from "./graphicData";
import { useDataPreparation } from "./utils";
import { useAuthStore } from "@/provider/store";
import Linechart from '../graphics/LineChart'
import { Department,User} from '@/types';
const DepartmentsNotes: React.FC = () => {
    const [barData, setBarData] = useGraphicData();
    const { isLoading, sections, Answers,departments, departXForms} = useDataPreparation();
    const forms = useAuthStore((state) => state.form);
    useEffect(() => {
        const listDepartment = departments.filter(department =>
            departXForms.some(depart => depart.department === department.id)
        );
        const list: DepartXCountAnswer[] = listDepartment.map(department => ({ department, count: 0, }));
        const generateRandomData = () => {
            const uniqueUserIds: Set<User> = new Set();
            Answers.forEach(answer => {
                const user = answer?.TL_Users;
                if (user) {
                    uniqueUserIds.add(user);
                }
            });
            list.forEach(department =>{
                let countAnswer=0;
                Answers.forEach(answer=>{
                    if(department.department.id===answer.TL_Users.TL_Departaments.id){
                        department.count+=parseInt(answer.TL_Options.score, 10);
                        countAnswer++;
                    }
                });
                department.count = countAnswer === 0 ? 0 : (department.count * 100) / (countAnswer * 100);
            });
            const departAverage: number[] = list.map(department => department.count);
            return departAverage;
        };
        if (!isLoading && Answers.length > 0 && listDepartment.length > 0) { 
            const sectionNames: string[] = listDepartment.map(department => department.name);
            setBarData(prevState => ({
                ...prevState,
                labels: sectionNames,
                datasets: [{
                    ...prevState.datasets[0],
                    data: generateRandomData(),
                    borderWidth: 4
                }],
            }));
        }
    }, [isLoading, Answers,departments,setBarData]);
    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <div><Linechart data={barData}/></div>
            )}
         </>
    );
};
export default DepartmentsNotes;