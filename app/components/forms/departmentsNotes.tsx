import React, { useEffect } from "react";
import Spinner from "../notifications/Spinner";
import { useGraphicData, useGraphicDataPie } from "./graphicData";
import { useDataPreparation } from "./utils";
import { useAuthStore } from "@/provider/store";
import Linechart from '../graphics/LineChart'
import { Department,User} from '@/types';
interface DepartXCountAnswer {
    department:Department;
    count:number;
}
const DepartmentsNotes: React.FC = () => {
    const [barData, setBarData] = useGraphicData();
    const { isLoading, sections, Answers,departments, departXForms} = useDataPreparation();
    const forms = useAuthStore((state) => state.form);
    useEffect(() => {
        const listDepartment = departments.filter(department =>
            departXForms.some(depart => depart.department === department.id)
        );
        const list: DepartXCountAnswer[] = listDepartment.map(department => ({
            department,
            count: 0,
        }));
        const generateRandomData = () => {
            const uniqueUserIds: Set<User> = new Set();
            Answers.forEach(answer => {
                const user = answer?.TL_Users;
                if (user) {
                    uniqueUserIds.add(user);
                }
            });
            list.forEach(department =>{
                uniqueUserIds.forEach(users=>{
                    if(department.department.id===users.department){
                        department.count+=1;
                    }
                });
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
                    borderWidth: 3
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