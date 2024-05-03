"use client";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { ErrorOption } from "react-hook-form";
import type { PhoneNumberValidationProps } from "@/types";


const PhoneNumberValidation: React.FC<PhoneNumberValidationProps> = ({ phone, setPhone ,register, error , name}) => {
  return (
    <div>
      <PhoneInput className='block font-normal my-3 w-[100%] pr-8 pl-8'
      {...register(name)}
        defaultCountry="cr"
        value={phone}
        name={name}
        onChange={(value) => setPhone(value)}
      />
              {
          error && <span className="text-red-500">{error?.message}</span>
        }
    </div>
  );
};

export default PhoneNumberValidation;
