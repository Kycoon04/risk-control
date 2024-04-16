"use client";
import Link from 'next/link';
import { RiUserSettingsFill } from "react-icons/ri";
import { SiGoogleforms } from "react-icons/si";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { SiGooglemarketingplatform } from "react-icons/si";
import { FaNetworkWired } from "react-icons/fa6";
import {Field} from '@/provider/types';
import { MdOutlineWork } from "react-icons/md";
const PreviewMaintenance: React.FC<Field> = ({ titule, url, icon }) => {

    const iconComponent =
        icon === 'RiUserSettingsFill' ? <RiUserSettingsFill className='text-4xl text-white m-4' /> :
        icon === 'SiGoogleforms' ? <SiGoogleforms className='text-4xl text-white m-4' /> :
        icon === 'BsFillQuestionSquareFill' ? <BsFillQuestionSquareFill className='text-4xl text-white m-4' /> :
        icon === 'SiGooglemarketingplatform' ? <SiGooglemarketingplatform className='text-4xl text-white m-4' /> :
        icon === 'FaNetworkWired' ? <FaNetworkWired className='text-4xl text-white m-4' /> :
        icon === 'MdOutlineWorkOutline' ? <MdOutlineWork className='text-4xl text-white m-4' /> :
        null;

    return (
        <div className='cursor-pointer'>
            <div className='bg-gray-200 m-3 p-3 flex flex-col rounded-3xl items-center justify-center hover:scale-105'>
                <h2 className='text-2xl sm:text-center text-white text-center m-5'>
                    {titule}
                </h2>
                <div className='bg-purple-400 flex gap-5 rounded-3xl text-white cursor-pointer justify-center'>
                    <Link href={url}>
                    {iconComponent}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PreviewMaintenance;