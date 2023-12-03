import type { Metadata } from 'next'
import { readProfile } from '@/fetch'
import { Suspense } from 'react'
import Load from '@/app/_component/load'
import UpdateName from '@/app/_component/update-name'
import UpdateImage from '@/app/_component/update-image'
import DataError from '@/app/_component/data-error'
import LogOut from '@/app/_component/log-out'
import ClearLogOut from '@/app/_component/clear-log-out'

export const metadata: Metadata = {
  title: 'Profile - IndProp',
}

export default function ProfilePage() {
  const Main = async () => {
    const profile = await readProfile()

    if (profile.data) {
      return (
        <div className='grid gap-y-8'>
          <div className='grid gap-y-3'>
            <h1 className='font-medium'>Avatar</h1>
            <div className='flex items-center justify-between gap-x-4 w-max text-sm'>
              <img src={profile.data.image ? 'https://indprop.dgrande.com/profile_photos/'+profile.data.image : '/user.jpg'} alt='Profile photo'
              className='w-32 aspect-square rounded-full border border-slate-300 object-cover object-center' />
              <div className='grid gap-y-3'>
                <UpdateImage />
              </div>
            </div>
          </div>
          <div className='grid gap-y-3'>
            <h1 className='font-medium'>Nama lengkap</h1>
            <UpdateName name={profile.data.name} />
          </div>
          <div className='grid gap-y-3'>
            <h1 className='font-medium'>Nama pengguna</h1>
            <input type='text' value={profile.data.username} disabled
            className='text-sm w-full rounded-md bg-slate-200 border border-slate-300 py-1.5 px-3 outline-none' />
          </div>
          <div className='grid gap-y-3'>
            <h1 className='font-medium'>Dibuat pada</h1>
            <h1 className='text-sm'>{profile.data.created_at || '-'}</h1>
          </div>
          <hr className='border-t border-slate-300 ' />
          <div className='grid gap-y-3'>
            <h1 className='font-medium'>Tema</h1>
            <div className='grid gap-y-2 text-sm'>
                <div className='flex items-center gap-x-4 cursor-pointer w-max'>
                    <div className='w-4 aspect-square outline outline-1 -outline-offset-1 outline-slate-300 border-4 border-slate-50 bg-blue-600 rounded-full' />
                    <h1>Ikuti sistem</h1>
                </div>
                <div className='flex items-center gap-x-4 cursor-pointer w-max'>
                    <div className='w-4 aspect-square outline outline-1 -outline-offset-1 outline-slate-300 border-4 border-slate-50 rounded-full' />
                    <h1>Terang</h1>
                </div>
                <div className='flex items-center gap-x-4 cursor-pointer w-max'>
                    <div className='w-4 aspect-square outline outline-1 -outline-offset-1 outline-slate-300 border-4 border-slate-50 rounded-full' />
                    <h1>Gelap</h1>
                </div>
            </div>
          </div>
          <hr className='border-t border-slate-300 ' />
          <div className='grid gap-y-3'>
            <h1 className='font-medium'>Keluar</h1>
            <div className='flex gap-x-4 items-center text-sm'>
              <LogOut />
              <ClearLogOut />
            </div>
          </div>
        </div>
      )
    }

    return <DataError error={profile.error} />
  }

  return (
    <div className='p-4'>
      <Suspense fallback={<Load size='large' />}>
        <Main />
      </Suspense>
    </div>
  )    
}