'use client'

import { createUnit } from "@/fetch";
import { Block, FormState, Status, Type } from "@/typing";
import { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom"
import { PiWarningCircle } from "react-icons/pi";
import Load from "./load";

const formState: FormState = {}

export default function CreateUnit({blocks, statuses, types}: {blocks: Block[], statuses: Status[], types: Type[]}) {
    const [add, setAdd] = useState<boolean>(false)
    const [message, setMessage] = useState<boolean>(false)
    const [state, formAction] = useFormState(createUnit, formState)

    useEffect(() => {
        if (state?.success) {
            setAdd(false)
        } else if (state?.message) {
            setMessage(true)
        }
    }, [state])

    useEffect(() => {
        if (!add) {
            setMessage(false)
        }
    }, [add])

    const Button = () => {
        const {pending} = useFormStatus()

        return (
            <button type="submit" disabled={pending} 
            className="hover:text-slate-700 uppercase">
                {pending ? <Load size="small" /> : 'Buat'}
            </button>
        )
    }

    return (
        <div>
            <button onClick={() => setAdd(true)} className="text-sm font-medium py-1.5 px-3 text-slate-50 bg-slate-950 rounded-md hover:bg-slate-900">
                Buat baru
            </button>

            <div onClick={() => setAdd(false)} className={`${!add && 'hidden'} fixed inset-0 bg-slate-950 bg-opacity-50 p-4 grid content-center z-20`}>
                <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-slate-50 border border-slate-300 rounded-md mx-auto">
                    <form action={formAction}>
                        <div className="grid gap-y-4 p-4 text-sm">
                            {message && state?.message && 
                                <div className="flex gap-x-2 items-center p-4 bg-red-100 border border-red-300 rounded-md">
                                    <PiWarningCircle className='text-lg' />
                                    <h1>{state.message}</h1>
                                </div>
                            }
                            <div className="grid grid-cols-2 gap-x-2">
                                <div className="grid gap-y-1">
                                    <h1 className="text-sm">Blok</h1>
                                    <select defaultValue={1} name="block-id"
                                    className="bg-transparent border border-slate-300 outline-slate-950 rounded-md w-full py-1.5 px-3 truncate">
                                        {blocks.map(item => 
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="grid gap-y-1">
                                    <h1 className="text-sm">Nomor</h1>
                                    <input type="number" name="num"
                                    className="bg-transparent border border-slate-300 outline-slate-950 rounded-md w-full py-1.5 px-3" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-2">
                                <div className="grid gap-y-1">
                                    <h1 className="text-sm">Status</h1>
                                    <select defaultValue={1} name="status-id"
                                    className="bg-transparent border border-slate-300 outline-slate-950 rounded-md w-full py-1.5 px-3 truncate">
                                        {statuses.filter(item => item.id <= 3).map(item => 
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="grid gap-y-1">
                                    <h1 className="text-sm">Type</h1>
                                    <select defaultValue={1} name="type-id"
                                    className="bg-transparent border border-slate-300 outline-slate-950 rounded-md w-full py-1.5 px-3 truncate">
                                        {types.map(item => 
                                            <option key={item.id} value={item.id}>{item.building}x{item.land}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="grid gap-y-1">
                                <h1 className="text-sm">Harga</h1>
                                <input type="number" name="price"
                                className="bg-transparent border border-slate-300 outline-slate-950 rounded-md w-full py-1.5 px-3" />
                            </div>
                        </div>
                        <div className="h-14 flex gap-x-6 justify-end items-center px-4 border-t border-slate-300 text-sm font-medium">
                            <button onClick={() => setAdd(false)} type="reset" className="text-slate-600 uppercase">Batal</button>
                            <Button />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}