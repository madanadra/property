'use client'

import { usePathname } from "next/navigation";

export default function Title() {
    const pathname = usePathname()

    return (
        <h1 className="text-sm font-semibold grow truncate capitalize">
            {pathname.length > 1 ? pathname.substring(1).replace('/', ' > ').replace('-', ' ') : 'dashboard'}
        </h1>
    )
}