export default function Load({size}: {size: 'small' | 'base' | 'large'}) {
    return (
        <div className={`${size === 'small' ? 'w-5 border-[3px]' : size === 'base' ? 'w-7 border-4' : 'w-9 border-[5px]'} 
        aspect-square rounded-full border-t-slate-300 border-r-slate-200 border-b-slate-100 border-l-slate-50 animate-spin mx-auto`} />
    )
}