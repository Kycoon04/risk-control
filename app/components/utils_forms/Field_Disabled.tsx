import type { FieldComponentProps } from "@/types";
import { useState } from "react";

const Field_Disabled: React.FC<FieldComponentProps> = ({ text_Field, setText_Field, titule, type, register, error, name }) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isDisabled) {
      setText_Field(event.target.value);
    }
  };

  const handleClick = () => {
    setIsDisabled(false);
  };

  return (
    <div className="block font-normal my-3 w-[100%] pr-8 pl-8">
      {titule}
      <input
        {...register(name)}
        type={type}
        name={name}
        id="Field_text"
        className={`block p-1 text-gray-600 bg-gray-50 rounded-md border-1 border-purple-500 appearance-none dark:border-gray-600 dark:focus:border-orange-400 focus:outline-none focus:ring-0 focus:border-gray-1000 peer w-full ${isDisabled ? 'disabled' : ''}`}
        placeholder=" "
        value={text_Field}
        onChange={handleInputChange}
        onClick={handleClick}
        readOnly 
      />
      {
        error && <span className="text-red-500">{error?.message}</span>
      }
    </div>
  );
};
export default Field_Disabled;