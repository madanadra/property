'use client'

import { logOut } from '@/fetch'
import { FormState } from '@/typing'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from "react-dom"
import Load from './load'

const formState: FormState = {}

export default function LogOut() {
    const [state, formAction] = useFormState(logOut, formState)

    useEffect(() => {
        state?.success && window.location.reload()
    }, [state])

    const Button = () => {
        const {pending} = useFormStatus()

        return (
            <button formAction={formAction} disabled={pending} 
            className="font-medium py-1.5 px-3 text-slate-50 bg-red-600 rounded-md hover:bg-red-500">
                {pending ? <Load size='small' /> : 'Keluar'}
            </button>
        )
    }

    return (
        <form>
            <Button />
        </form>
    )
}