"use client";
import { ParamQuestions } from "@/types";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface Card extends ParamQuestions {
    prompt_one: string;
    prompt_two: string;
    prompt_three: string;
    prompt_fourth:string;
    handleDeleteQuestion: (roleId: string) => Promise<void>;
}

const QuestionCard: React.FC<Card> = (promp: Card) => {  
    const onDeleteClick = async () => {
        await promp.handleDeleteQuestion(promp.id);
      };
    return (
        <div className="bg-blue-1000 w-full flex flex-wrap gap-5 my-2 rounded-md px-5 p-2 items-center">
            <div className="flex-1">
                <p className="my-1 text-lg">{promp.prompt_one}</p>
                <p>{promp.id}</p>
            </div>
            <div className="flex-1">
                <p className="my-1 text-lg">{promp.prompt_two}</p>
                <p>{promp.question}</p>
            </div>
            <div className="flex-1">
                <p className="my-1 text-lg">{promp.prompt_three}</p>
                    <p>{promp.description}</p>
            </div>
            <div className="flex-1">
                <p className="my-1 text-lg">{promp.prompt_fourth}</p>
                    <p>{promp.section}</p>
            </div>
            <div className="w-full md:w-auto flex justify-center md:justify-start">
                <div className='bg-purple-400 flex gap-5 rounded-2xl text-white cursor-pointer m-2 justify-center p-3'>
                    <FaEdit className="text-white font text-4xl hover:text-slate-300" />
                </div>
                <div className='bg-purple-400 flex gap-5 rounded-2xl text-white cursor-pointer m-2 justify-center p-3' onClick={onDeleteClick}>
                    <MdDelete className="text-white font text-4xl hover:text-slate-300" />
                </div>
            </div>
        </div>
    );
}

export default QuestionCard;