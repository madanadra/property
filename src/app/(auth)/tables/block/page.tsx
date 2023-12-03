import DataError from "@/app/_component/data-error"
import Load from "@/app/_component/load"
import { readBlocks } from "@/fetch"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
    title: 'Block - IndProp',
}

export default function BlockPage() {
    const Main = async () => {
        const blocks = await readBlocks()
    
        if (blocks.data) {
            return (
                <div className="grid gap-y-4">
                    <div className='flex justify-between items-center gap-x-4'>
                        <h1 className='text-sm text-slate-600'>{blocks.data.length} Item</h1>
                        <button className="text-sm font-medium py-1.5 px-3 text-slate-50 bg-slate-950 rounded-md hover:bg-slate-900">
                            Buat baru
                        </button>
                    </div>
                    <div className="grid divide-y divide-slate-300 text-sm border border-slate-300 rounded-md overflow-hidden">
                        <div className="grid grid-cols-12 gap-x-4 p-4 font-medium bg-slate-100">
                            <h1 className="col-span-4">Blok</h1>
                            <h1 className="col-span-3">Unit</h1>
                            <h1 className="col-span-5">Dibuat pada</h1>
                        </div>
                        {blocks.data.length ? blocks.data.map(item => 
                            <div key={item.id} className="grid grid-cols-12 gap-x-4 p-4">
                                <h1 className="col-span-4">{item.name}</h1>
                                <h1 className="col-span-3 text-slate-600">{item.unit_count}</h1>
                                <h1 className="col-span-5 text-slate-600">{item.created_at || '-'}</h1>
                            </div>  
                        ) : <h1 className="p-4 font-medium text-center text-slate-600">Tidak ada item</h1>}
                    </div>
                </div>
            )
        }
    
        return <DataError error={blocks.error} />
      }
    
    return (
        <div className='p-4'>
          <Suspense fallback={<Load size='large' />}>
            <Main />
          </Suspense>
        </div>
    )    
}