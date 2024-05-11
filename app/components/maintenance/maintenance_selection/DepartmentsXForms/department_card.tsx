"use client";
import Link from 'next/link';
import { departmentSelected } from "@/types";
import { MdOutlineDomainAdd } from "react-icons/md";
import { BsFillXSquareFill } from "react-icons/bs";
import { fetchDepartment  } from '../../../actions/actions_departments/actions';
import {Error,Success} from '../../../notifications/alerts';
interface Card extends departmentSelected {
    prompt_one: string;
    prompt_two: string;
    prompt_three: string;
    handleDeleteDepartment: (departmentId: string) => Promise<void>;
    handleAddDepartment: (departmentId: string) => Promise<void>;
}

const DepartmentCard: React.FC<Card> = (promp: Card) => {  
    const onDeleteClick = async () => {
        await promp.handleDeleteDepartment(promp.department.id);
      };
      const onModifyClick = async () => {
        await promp.handleAddDepartment(promp.department.id);
      };
    return (
        <div className="bg-blue-1000 w-full flex flex-wrap gap-5 my-2 rounded-md px-5 p-2 items-center">
            <div className="flex-1">
                <p className="my-1 text-lg">{promp.prompt_one}</p>
                <p>{promp.department.name}</p>
            </div>
            <div className="flex-1">
                <p className="my-1 text-lg">{promp.prompt_two}</p>
                <p>{promp.department.unit}</p>
            </div>
            <div className="flex-1">
                <p className="my-1 text-lg">{promp.prompt_three}</p>
                <p>{promp.state}</p>
            </div>
            <div className="w-full md:w-auto flex justify-center md:justify-start">

                {promp.state == 'No Agregado' ? (
                    <div className='bg-purple-400 flex gap-5 rounded-2xl text-white cursor-pointer m-2 justify-center p-3' onClick={onModifyClick}>
                         <MdOutlineDomainAdd className="text-white font text-4xl hover:text-slate-300" />
                    </div>
                ) : (
                    <div className='bg-purple-400 flex gap-5 rounded-2xl text-white cursor-pointer m-2 justify-center p-3' onClick={onDeleteClick}>
                        <BsFillXSquareFill className="text-white font text-4xl hover:text-slate-300" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default DepartmentCard;