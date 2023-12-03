import { Metadata } from "next"
import Link from "next/link"
import { PiCaretRight } from "react-icons/pi"

export const metadata: Metadata = {
    title: 'Tables - IndProp',
}

export default function TablesPage() {
    const Box = ({url, name}: {url: string, name: string}) => {
        return (
            <Link href={url} className="flex items-center justify-between gap-x-4 p-4 hover:bg-slate-100">
                <h1>{name}</h1>
                <PiCaretRight className='text-xl' />
            </Link>
        )
    }

    return (
        <div className="grid gap-y-4 p-4">
            <div className="grid divide-y divide-slate-300">
                <h1 className="text-sm text-slate-600 pb-4">Unit</h1>
                <Box url='/tables/block' name="Block" />
                <Box url='/tables/status' name="Status" />
                <Box url='/tables/type' name="Type" />
            </div>

            <div className="grid divide-y divide-slate-300">
                <h1 className="text-sm text-slate-600 pb-4">Pegawai</h1>
                <Box url='/tables/admin' name="Admin" />
            </div>
        </div>               
    )
}