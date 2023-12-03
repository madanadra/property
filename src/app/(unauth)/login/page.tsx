import LogIn from '@/app/_component/log-in';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Login - IndProp',
}

export default function LoginPage() {
    return (
        <div className='grid max-w-sm gap-y-4 justify-items-center p-4 mx-auto'>
            <Image priority src='/icon.ico' alt='Logo' width={100} height={100} className='mt-8' />
            <h1 className='font-light text-2xl my-4'>Masuk ke IndProp</h1>
            <LogIn />
            <h1 className='text-slate-600 text-xs mt-8'>&copy; 2023 IndProp</h1>
        </div>
    )
}