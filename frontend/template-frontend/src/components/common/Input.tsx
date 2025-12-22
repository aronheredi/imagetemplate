import { twMerge } from 'tailwind-merge'

export default function Input({ type = "text", ...props }) {
    return (
        <input  {...props} type={type} className={twMerge('border border-slate-300  rounded-lg p-2 w-full', props.className)} />
    );
}