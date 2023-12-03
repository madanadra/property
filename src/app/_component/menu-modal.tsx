'use client'

import { usePathname } from "next/navigation";
import { PiList } from "react-icons/pi";
import { useEffect, useState } from "react";
import Menu from "./menu";

export default function MenuModal() {
    const pathname = usePathname()
    const [menu, setMenu] = useState<boolean>()

    useEffect(() => {
        setMenu(false)
    }, [pathname])

    return (<>
        <PiList onClick={() => setMenu(true)} className='md:hidden text-xl text-slate-600 cursor-pointer' />

        <div onClick={() => setMenu(false)} className={`${!menu && 'hidden'} md:hidden fixed inset-0 bg-slate-950 bg-opacity-50`}>
            <div onClick={(e) => e.stopPropagation()} className="bg-slate-50 w-3/4 animation-menu">
                <Menu />
            </div>
        </div>
    </>)
}