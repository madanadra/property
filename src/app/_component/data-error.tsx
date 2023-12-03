export default function DataError({error}: {error: number}) {
    return <h1 className='font-medium text-slate-600 text-center p-4 w-full'>Kode kesalahan {error}</h1>
}