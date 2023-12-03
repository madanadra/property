'use client'

import { clearLogOut } from '@/fetch'
import { FormState } from '@/typing'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from "react-dom"
import Load from './load'

const formState: FormState = {}

export default function ClearLogOut() {
    const [state, formAction] = useFormState(clearLogOut, formState)

    useEffect(() => {
        state?.success && window.location.reload()
    }, [state])

    const Button = () => {
        const {pending} = useFormStatus()

        return (
            <button formAction={formAction} disabled={pending} 
            className="font-medium py-1.5 px-3 text-red-700 border border-red-300 rounded-md hover:bg-red-100">
                {pending ? <Load size='small' /> : 'Keluar dari semua akun'}
            </button>
        )
    }

    return (
        <form>
            <Button />
        </form>
    )
}