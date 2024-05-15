"use client";
import Link from 'next/link';
import { ParamOption } from "@/types";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { fetchDepartment  } from '../../actions/actions_departments/actions';
import {Error,Success} from '../../notifications/alerts';
interface Card extends ParamOption {
    prompt_one: string;
    prompt_two: string;
    prompt_three: string;
    handleDeleteOption: (optionId: string) => Promise<void>;
    handleModifyOption: (option: ParamOption) => Promise<void>;
}

const OptionCard: React.FC<Card> = (promp: Card) => {  
    const onDeleteClick = async () => {
        await promp.handleDeleteOption(promp.id);
      };
      const onModifyClick = async () => {
        await promp.handleModifyOption(promp);
      };
    return (
        <div className="bg-blue-1000 w-full flex flex-wrap gap-5 my-2 rounded-md px-5 p-2 items-center">
            <div className="flex-1">
                <p className="my-1 text-lg">{promp.prompt_one}</p>
                <p>{promp.question}</p>
            </div>
            <div className="flex-1">
                <p className="my-1 text-lg">{promp.prompt_two}</p>
                <p>{promp.score}</p>
            </div>
            <div className="flex-1">
                <p className="my-1 text-lg">{promp.prompt_three}</p>
                <p>{promp.option}</p>
            </div>
            <div className="w-full md:w-auto flex justify-center md:justify-start">
                <div className='bg-purple-400 flex gap-5 rounded-2xl text-white cursor-pointer m-2 justify-center p-3' onClick={onModifyClick}>
                    <Link href={'/home_page/maintenance/mainte_options/options_form'}>
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

export default OptionCard;