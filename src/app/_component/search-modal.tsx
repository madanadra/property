'use client'

import { useEffect, useRef, useState } from "react";
import { PiMagnifyingGlass, PiX } from "react-icons/pi";

export default function SearchModal() {
    const [search, setSearch] = useState<boolean>()
    const searchRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (search && searchRef.current) {
            searchRef.current.focus()
        }
    }, [search])

    return (<>
        <PiMagnifyingGlass onClick={() => setSearch(true)} className='text-xl text-slate-600 cursor-pointer' />

        <div onClick={() => setSearch(false)} className={`${!search && 'hidden'} fixed inset-0 bg-slate-950 bg-opacity-50 p-4`}>
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-slate-50 border border-slate-300 rounded-md mx-auto">
                <div className="h-14 flex items-center gap-x-4 px-4 border-b border-slate-300">
                    <input type="text" ref={searchRef} placeholder="Cari..." className="bg-transparent outline-none border-none py-1.5 grow" />
                    <PiX onClick={() => setSearch(false)} className='text-xl text-slate-600 cursor-pointer' />
                </div>
                <div>
                    <h1 className="text-center text-sm font-medium text-slate-600 p-4">
                        Belum ada pencarian
                    </h1>
                </div>
            </div>
        </div>
    </>)
}