"use client";
import { RiUserSettingsFill } from "react-icons/ri";
import { SiGoogleforms } from "react-icons/si";
import { TiUser } from 'react-icons/ti';
import { FaNetworkWired } from "react-icons/fa6";
import {ReportCardsProps} from '@/types';
import { BsFillQuestionSquareFill } from "react-icons/bs";

 const ReportsCards: React.FC<ReportCardsProps> = ({ title, icon, callbackExcel }) => {

    const iconComponent =
        icon === 'RiUserSettingsFill' ? <RiUserSettingsFill className='text-4xl text-white m-4' /> :
        icon === 'SiGoogleforms' ? <SiGoogleforms className='text-4xl text-white m-4' /> :
        icon === 'FaNetworkWired' ? <FaNetworkWired className='text-4xl text-white m-4' /> :
        icon === 'TiUser' ? <TiUser className='text-4xl text-white m-4' /> :
        icon === 'BsFillQuestionSquareFill' ? <BsFillQuestionSquareFill className='text-4xl text-white m-4' /> :
        null;

    return (
        <div className='cursor-pointer'>
            <div className='bg-gray-200 m-3 p-3 flex flex-col rounded-3xl items-center justify-center hover:scale-105' onClick={callbackExcel}>
                <h2 className='text-2xl sm:text-center text-white text-center m-5'>
                    {title}
                </h2>
                <div className='bg-purple-400 flex gap-5 rounded-3xl text-white cursor-pointer justify-center'>
                    {iconComponent}
                </div>
            </div>
        </div>
    );
};

export default ReportsCards;