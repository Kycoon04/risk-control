"use client";
import Link from 'next/link';
import { ParamUnit } from "@/types";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { fetchUnit  } from '../../actions/actions_units/actions';
import {Error,Success} from '../../notifications/alerts';
interface Card extends ParamUnit {
    prompt_one: string;
    prompt_two: string;
    prompt_three: string;
    handleDeleteUnit: (unitId: string) => Promise<void>;
    handleModifyUnit: (unit: ParamUnit) => Promise<void>;
}

const UnitCard: React.FC<Card> = (promp: Card) => {  
    const onDeleteClick = async () => {
        await promp.handleDeleteUnit(promp.id);
      };
      const onModifyClick = async () => {
        await promp.handleModifyUnit(promp);
      };
    return (
        <div className="bg-blue-1000 w-full flex flex-wrap gap-5 my-2 rounded-md px-5 p-2 items-center">
            <div className="flex-1">
                <p className="my-1 text-lg">{promp.prompt_one}</p>
                <p>{promp.id}</p>
            </div>
            <div className="flex-1">
                <p className="my-1 text-lg">{promp.prompt_two}</p>
                <p>{promp.name}</p>
            </div>
            <div className="flex-1">
                <p className="my-1 text-lg">{promp.prompt_three}</p>
                <p>{promp.description}</p>
            </div>
            <div className="w-full md:w-auto flex justify-center md:justify-start">
                <div className='bg-purple-400 flex gap-5 rounded-2xl text-white cursor-pointer m-2 justify-center p-3' onClick={onModifyClick}>
                     <Link href={'/home_page/maintenance/mainte_units/units_form'}>
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

export default UnitCard;