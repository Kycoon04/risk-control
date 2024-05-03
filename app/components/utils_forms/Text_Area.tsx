"use client";
import type { FieldComponentProps } from "@/types";

const Text_Area: React.FC<FieldComponentProps> = ({ text_Field, setText_Field, titule, type, register, error, name }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText_Field(event.target.value);
  };
  return (
    <div className="block font-normal my-3 w-[100%] pr-8 pl-8">
      {titule}
      <textarea
        {...register(name)}
        type={type}
        name={name}
        id="Field_text"
        className="block p-1  text-black bg-white rounded-md border-1 border-gray-600 appearance-none dark:border-gray-600 dark:focus:border-orange-400 focus:outline-none focus:ring-0 focus:border-gray-1000 peer w-full"
        placeholder=" "
        value={text_Field}
        onChange={handleInputChange}
      />
      {
        error && <span className="text-red-500">{error?.message}</span>
      }
    </div>
  );
};
export default Text_Area;