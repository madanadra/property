'use client'

import { logIn } from "@/fetch"
import { FormState } from "@/typing"
import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { PiWarningCircle } from "react-icons/pi"
import Load from "./load"

const formState: FormState = {}

export default function LogIn() {
    const [state, formAction] = useFormState(logIn, formState)

    useEffect(() => {
        state?.success && window.location.reload()
    }, [state])

    const Button = () => {
        const {pending} = useFormStatus()

        return (
            <button type="submit" disabled={pending} 
            className="mt-2 font-medium bg-slate-950 hover:bg-slate-900 text-slate-50 py-1.5 px-3 rounded-md">
                {pending ? <Load size="small" /> : 'Masuk'}
            </button>
        )
    }
    
    return (<>
        {state?.message && 
            <div className="w-full flex gap-x-2 items-center bg-red-100 border border-red-300 p-4 rounded-md">
                <PiWarningCircle className='text-lg' />
                <h1 className="text-sm">{state.message}</h1>
            </div>
        }
        <form action={formAction} className="w-full grid gap-y-4 text-sm bg-slate-100 border border-slate-300 p-4 rounded-md">
            <div className="grid gap-y-1">
                <h1>Username</h1>
                <input type="text" name="username"
                className="border border-slate-300 bg-slate-50 py-1.5 px-3 rounded-md outline-slate-950" />
            </div>
            <div className="grid gap-y-1">
                <h1>Password</h1>
                <input type="password" name="password" 
                className="border border-slate-300 bg-slate-50 py-1.5 px-3 rounded-md outline-slate-950" />
            </div>
            <Button />
        </form>
    </>)
}