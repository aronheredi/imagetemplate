import { twMerge } from "tailwind-merge"

export default function Input({ ...props }) {
    return (
        <input {...props} type="text" className={twMerge("border border-slate-300  rounded-lg p-2 w-full", props.className)} />
    );
}