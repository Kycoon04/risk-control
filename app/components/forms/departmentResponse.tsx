import React, { useEffect } from "react";
import Spinner from "../notifications/Spinner";
import { useGraphicData, DepartXCountAnswer } from "./graphicData";
import { useDataPreparation } from "./utils";
import { useAuthStore } from "@/provider/store";
import Barchart from '../graphics/Barchart_Horizontal'
import { Department,User, departmentSelected} from '@/types';

const DepartmentResponse: React.FC = () => {
    const [barData, setBarData] = useGraphicData();
    const { isLoading, sections, Answers,departments, departXForms} = useDataPreparation();
    const forms = useAuthStore((state) => state.form);
    useEffect(() => {
        const listDepartment = departments.filter(department => departXForms.some(depart => depart.department === department.id));
        const generateRandomData = () => {
            const list: DepartXCountAnswer[] = listDepartment.map(department => ({ department, count: 0,}));
            const extractUniqueUsers = (Answers: any[]): User[] => {
                const uniqueUserMap: Map<string, User> = new Map();
                Answers.forEach(answer => {
                    const user: User = answer?.TL_Users;
                    if (user && !uniqueUserMap.has(user.id)) {
                        uniqueUserMap.set(user.id, user);
                    }
                });
                return Array.from(uniqueUserMap.values());
            };
            const users = extractUniqueUsers(Answers);
            users.forEach(users=>{
                list.forEach(department =>{
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
                }],
            }));
        }
    }, [isLoading, Answers,departments,setBarData,departXForms]);
    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <div><Barchart data={barData}/></div>
            )}
         </>
    );
};
export default DepartmentResponse;