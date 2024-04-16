"use client";
import Image from 'next/image';

interface Card {
    image: string;
    titule: string;
    subtitule:string;
  }

const Componente: React.FC<Card> = ({ image,titule,subtitule }) => {
  return (
    <div className='bg-gray-200 w-max m-10 p-5 rounded-3xl flex flex-col justify-center items-center'>
      <Image className='rounded-full' src={image} alt="Screenshots of the dashboard" width={90} height={90} />
      <p className='font-semibold p-3 text-white'>{titule}</p>
      <p className='p-3 text-gray-50 font-extralight text-xs'>{subtitule}</p>
    </div>
  );
}

export default Componente;