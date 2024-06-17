"use client";
import Link from 'next/link';
import { roleSelected } from "@/types";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
interface Card extends roleSelected {
    prompt_one: string;
    prompt_two: string;
    prompt_three: string;
    prompt_fourth: string;
    handleDeleteRole: (roleId: string) => Promise<void>;
    handleAddRole: (roleId: string) => Promise<void>;
}
const RoleCard: React.FC<Card> = (promp: Card) => {  
    const onDeleteClick = async () => {
        await promp.handleDeleteRole(promp.role.id);
      };
      const onModifyClick = async () => {
        await promp.handleAddRole(promp.role.id);
      };
    return (
        <div className="bg-blue-1000 w-full flex flex-wrap gap-5 my-2 rounded-md px-5 p-2 items-center">
            <div className="flex-1">
                <p className="my-1 text-lg">{promp.prompt_one}</p>
                <p>{promp.role.id}</p>
            </div>
            <div className="flex-1">
                <p className="my-1 text-lg">{promp.prompt_two}</p>
                <p>{promp.role.name}</p>
            </div>
            <div className="flex-1">
                <p className="my-1 text-lg">{promp.prompt_three}</p>
                {promp.role.active == "1" ? (
                    <p>{"Activo"}</p>
                ) : (
                    <p>{"Inactivo"}</p>
                )}
            </div>
            <div className="flex-1">
                <p className="my-1 text-lg">{promp.prompt_fourth}</p>
                <p>{promp.state}</p>
            </div>
            <div className="w-full md:w-auto flex justify-center md:justify-start">
                {promp.state == 'No Agregado' ? (
                    <div className='bg-purple-400 flex gap-5 rounded-2xl text-white cursor-pointer m-2 justify-center p-3' onClick={onModifyClick}>
                         < MdCheckBoxOutlineBlank className="text-white font text-4xl hover:text-slate-300" />
                    </div>
                ) : (
                    <div className='bg-purple-400 flex gap-5 rounded-2xl text-white cursor-pointer m-2 justify-center p-3' onClick={onDeleteClick}>
                        < MdCheckBox className="text-white font text-4xl hover:text-slate-300" />
                    </div>
                )}
            </div>
        </div>
    );
}
export default RoleCard;