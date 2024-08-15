import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  register: any;
  required?: boolean;
}

// The following component is an example of your existing Input Component
export const Input = ({ label, register, required, name }: InputProps) => (
  <>
    <label>{label}</label>
    <input
      {...register(name, { required})}
      className="bg-black border-white border-solid border-[1px]"
    />
  </>
);
