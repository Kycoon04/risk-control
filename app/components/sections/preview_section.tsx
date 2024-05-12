"use client";
import { useAuthStore } from '@/provider/store';
import Link from 'next/link';
import { FaPen } from "react-icons/fa6";
import {Section} from '@/types';
const Component: React.FC<Section> = ({complete,name,id,description,forms }) => {
    const setSection = useAuthStore(state => state.setSection);
    const handleFormSelection = () => {
        const newSection: Section = {
            id:id,
            name: name,
            description: description,
            forms: forms,
            complete:complete
        };
        setSection(newSection);
    };
    return (
        <div className='flex justify-center'>
            <div className='flex flex-col sm:flex-row w-full sm:w-[90%] bg-gray-200 m-3 p-3 rounded-3xl gap-10 items-center justify-between'>
                <h2 className='text-2xl sm:pr-10 text-center sm:text-left text-white'>
                    {name}
                </h2>
                <div className='bg-gray-1000 w-full rounded-3xl'>
                    <h3 className='ml-4 mt-4 text-center sm:text-left text-white'>{complete}</h3>
                    <div className="flex w-full sm:w-[90%] bg-transparent rounded-full m-4 mt-2 h-2.5 dark:bg-gray-700 justify-start">
                        <div className={`bg-purple-400 h-2.5 rounded-full w-[50%]`}></div>
                    </div>
                </div>
                {complete !== "Completado" && (
                    <div className='bg-purple-400 rounded-3xl text-white' onClick={handleFormSelection}>
                        <Link href='/home_page/forms/sections'>
                            <FaPen className='text-4xl m-4' /> 
                        </Link>
                    </div>
                )}
            </div>
        </div>

    );
}

export default Component;