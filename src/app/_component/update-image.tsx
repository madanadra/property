'use client'

import { updateImage } from "@/fetch";
import { FormState } from "@/typing";
import { useFormStatus, useFormState } from "react-dom"
import Load from "./load";
import { PiWarningCircle } from "react-icons/pi";
import { useRef } from "react";

const formState: FormState = {}

export default function UpdateImage() {
    const [state, formAction] = useFormState(updateImage, formState)
    const imageRef = useRef<HTMLInputElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const Button = () => {
        const {pending} = useFormStatus()

        return (
            <button type="reset" onClick={() => imageRef.current?.click()} disabled={pending}
            className="py-1.5 px-3 font-medium rounded-md bg-blue-600 hover:bg-blue-500 text-slate-50">
                {pending ? <Load size="small" /> : 'Ubah'}
            </button>
        )
    }

    return (<>
        {state?.message && 
            <div className="flex gap-x-2 items-center text-red-700">
                <PiWarningCircle className='text-lg' />
                <h1>{state.message}</h1>
            </div>
        }
        <form action={formAction}>
            <input ref={imageRef} type="file" name="image" accept="image/png, image/jpg, image/jpeg"
            className="hidden" onChange={() => buttonRef.current?.click()} />
            <Button />
            <button ref={buttonRef} type="submit" className="hidden" />
        </form>
    </>)
}