'use client'

import { updateName } from "@/fetch";
import { FormState } from "@/typing";
import { useFormStatus, useFormState } from "react-dom"
import Load from "./load";
import { PiWarningCircle } from "react-icons/pi";

const formState: FormState = {}

export default function UpdateName({name}: {name: string}) {
    const [state, formAction] = useFormState(updateName, formState)

    const Button = () => {
        const {pending} = useFormStatus()

        return (
            <button type="submit" disabled={pending} 
            className="py-1.5 px-3 font-medium rounded-md bg-blue-600 hover:bg-blue-500 text-slate-50">
                {pending ? <Load size="small" /> : 'Ubah'}
            </button>
        )
    }

    return (<>
        {state?.message && 
            <div className="flex gap-x-2 items-center text-red-700">
                <PiWarningCircle className='text-lg' />
                <h1 className="text-sm">{state.message}</h1>
            </div>
        }
        <form action={formAction} className='flex items-center justify-between gap-x-4 text-sm'>
            <input type='text' defaultValue={name} name="name"
            className='w-full rounded-md bg-transparent border border-slate-300 py-1.5 px-3 outline-none' />
            <Button />
        </form>
    </>)
}