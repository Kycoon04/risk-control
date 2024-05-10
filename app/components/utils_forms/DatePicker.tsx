"use client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { DatePickerComponent } from "@/types";

const Field: React.FC<DatePickerComponent> = ({ value, setText_Field, titule }) => {

  return (
    <div className="block font-normal my-3 w-[100%] pr-8 pl-8">
      {titule}
      <DatePicker
            selected={value}
            onChange={(date: Date) => setText_Field(date)}
            placeholderText="01/01/2010"
            className="m-2 p-2 border border-gray-500 rounded-md text-black" />
    </div>
  );
};
export default Field;