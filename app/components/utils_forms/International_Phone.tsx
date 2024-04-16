"use client";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { ErrorOption } from "react-hook-form";

interface PhoneNumberValidationProps {
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  register:any,
  error:undefined | ErrorOption
  name:string
}

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
