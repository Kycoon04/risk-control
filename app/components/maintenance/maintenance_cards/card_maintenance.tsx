"use client";
import Link from 'next/link';
import {RoleXUser, User } from "@/types";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
  
interface Card extends User {
    prompt_one: string;
    prompt_two: string;
    prompt_three: string;
    handleDeleteUser: (userId: string) => Promise<void>;
    handleModifyUser: (user: User) => Promise<void>;
}


const UserCard: React.FC<Card> = (promp: Card) => {  

    const onDeleteClick = async () => {
        await promp.handleDeleteUser(promp.id);
      };
      const onModifyClick = async () => {
        await promp.handleModifyUser(promp);
      };


    return (
        <div className="bg-blue-1000 w-full flex flex-wrap gap-5 my-2 rounded-md px-5 p-2 items-center">
            <div className="flex-1">
                <p className="my-1 text-lg">{promp.prompt_one}</p>
                <p>{promp.name} {promp.second_name} {promp.surname} {promp.second_surname}</p>
            </div>
            <div className="flex-1">
                <p className="my-1 text-lg">{promp.prompt_two}</p>
                <p>{promp.identification}</p>
            </div>
            <div className="flex-1">
                <p className="my-1 text-lg">{promp.prompt_three}</p>
                <p>{promp.nickname}</p>
            </div>
            <div className="w-full md:w-auto flex justify-center md:justify-start">
                <div className='bg-purple-400 flex gap-5 rounded-2xl text-white cursor-pointer m-2 justify-center p-3'  onClick={onModifyClick}>
                    <Link href={'/home_page/maintenance/mainte_users/users_form'}>
                        <FaEdit className="text-white font text-4xl hover:text-slate-300" />
                    </Link>
                </div>
                <div className='bg-purple-400 flex gap-5 rounded-2xl text-white cursor-pointer m-2 justify-center p-3' onClick={onDeleteClick}>
                    <MdDelete className="text-white font text-4xl hover:text-slate-300" />
                </div>
            </div>
        </div>
    );
}

export default UserCard;