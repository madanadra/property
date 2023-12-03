import type { Metadata } from 'next';
import { Suspense } from 'react';
import { readUnits, readBlocks, readStatuses, readTypes } from '@/fetch';
import Load from '../_component/load';
import Link from 'next/link';
import { PiCaretRight } from 'react-icons/pi';
import CreateUnit from '../_component/create-unit';
import { FaHouse, FaHouseLock, FaHouseChimneyUser, FaHouseLaptop } from "react-icons/fa6";
import DataError from '../_component/data-error';

export const metadata: Metadata = {
  title: 'Dashboard - IndProp',
}

export default function DashboardPage() {
  const available = ['Belum siap jual', 'Siap jual', 'Dipasarkan']
  const booked = ['Dipesan']
  const processed = ['Pemberkasan', 'Wawancara', 'OTS', 'SP3K']
  const sold = ['Akad (KPR)', 'Akad (Tunai)']

  const Main = async () => {
    const units = await readUnits()
    const blocks = await readBlocks()
    const statuses = await readStatuses()
    const types = await readTypes()

    if (units.data && blocks.data && statuses.data && types.data) {
      const sort = units.data.sort((a, b) => {
        if (a.block.id < b.block.id) {
            return -1
        } else if (a.block.id === b.block.id) {
            if (a.num < b.num) {
                return -1
            } else {
                return 1
            }
        } else {
            return 1
        }
      })
  
      return (
        <div className='grid gap-y-4'>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="flex items-center gap-x-4 border border-slate-300 rounded-md p-4">
              <FaHouse className='text-blue-600 text-5xl' />
              <div className='grow text-right'>
                <h1 className='text-xl font-medium'>
                  {units.data.filter(item => available.includes(item.status.name)).length}
                </h1>
                <h1 className='text-sm text-slate-600'>Unit tersedia</h1>
              </div>
            </div>

            <div className="flex items-center gap-x-4 border border-slate-300 rounded-md p-4">
              <FaHouseLock className='text-red-600 text-5xl' />
              <div className='grow text-right'>
                <h1 className='text-xl font-medium'>
                  {units.data.filter(item => booked.includes(item.status.name)).length}
                </h1>
                <h1 className='text-sm text-slate-600'>Unit dipesan</h1>
              </div>
            </div>

            <div className="flex items-center gap-x-4 border border-slate-300 rounded-md p-4">
              <FaHouseLaptop className='text-yellow-600 text-5xl' />
              <div className='grow text-right'>
                <h1 className='text-xl font-medium'>{units.data.filter(item => processed.includes(item.status.name)).length}
                </h1>
                <h1 className='text-sm text-slate-600'>Unit diproses</h1>
              </div>
            </div>

            <div className="flex items-center gap-x-4 border border-slate-300 rounded-md p-4">
              <FaHouseChimneyUser className='text-green-600 text-5xl' />
              <div className='grow text-right'>
                <h1 className='text-xl font-medium'>
                  {units.data.filter(item => sold.includes(item.status.name)).length}
                </h1>
                <h1 className='text-sm text-slate-600'>Unit terjual</h1>
              </div>
            </div>

          </div>

          <div className='grid divide-y divide-slate-300'>
            <div className='flex justify-between items-center gap-x-4 py-4'>
              <h1 className='text-sm text-slate-600'>{units.data.length} Item</h1>
              <CreateUnit blocks={blocks.data} statuses={statuses.data} types={types.data} />
            </div>
          
            {sort.map(item => 
              <Link href='/' key={item.id} className='flex items-center gap-x-4 p-4 hover:bg-slate-100'>
                  <h1 className='grow'>{item.block.name} - {item.num}</h1>
                  <h1 className={`text-sm font-medium ${
                  available.includes(item.status.name) ? 'text-blue-700' : 
                  booked.includes(item.status.name) ? 'text-red-700' :
                  available.includes(item.status.name) ? 'text-yellow-700' :
                  available.includes(item.status.name) ? 'text-green-700' :
                  'text-slate-600'}`}>{item.status.name}</h1>
                  <PiCaretRight className='text-xl text-slate-600' />
              </Link>
            )}
          </div>
        </div>
      )
    }

    if (units.error) {
      return <DataError error={units.error} />
    }

    if (blocks.error) {
      return <DataError error={blocks.error} />
    }

    if (statuses.error) {
      return <DataError error={statuses.error} />
    }

    if (types.error) {
      return <DataError error={types.error} />
    }
  }

  return (
    <div className='p-4'>
      <Suspense fallback={<Load size='large' />}>
        <Main />
      </Suspense>
    </div>
  )    
}