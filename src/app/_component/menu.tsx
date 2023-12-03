'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiSquare, PiSquareSplitVertical, PiNoteBlank, PiBook } from "react-icons/pi";


export default function Menu() {
    const MenuLink = ({link, icon, name}: {link: string, icon: React.ReactElement, name: string}) => {
        const pathname = usePathname()
        const isPage = pathname.substring(1).indexOf('/') === -1 ? pathname === link : pathname.indexOf(link+'/') != -1
        
        return (
            <Link href={link} className={`${isPage ? 'bg-slate-100' : 'text-slate-600 hover:bg-slate-100'} 
            flex items-center gap-x-4 p-4`}>
                <div className="text-xl">{icon}</div>
                <h1 className="font-medium">{name}</h1>
            </Link>
        )
    }

    return (
        <div className="bg-slate-50 border-r border-slate-300 h-screen sticky top-0">
            <div className="h-14 grid content-center px-4">
                <Image src='/icon.ico' alt="Logo" width={28} height={28} />
            </div>
            <MenuLink link="/" icon={<PiSquare />} name="Dashboard" />
            <MenuLink link="/tables" icon={<PiSquareSplitVertical />} name="Tables" />
            <MenuLink link="/documents" icon={<PiNoteBlank />} name="Documents" />
            <MenuLink link="/history" icon={<PiBook />} name="History" />
        </div>
    )
}