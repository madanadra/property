import Header from '../_component/header'
import Menu from '../_component/menu'

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='md:flex'>
            <div className='hidden md:grid w-64'>
                <Menu />
            </div>
            <div className='grow'>
                <Header />
                {children}
            </div>
        </div>
    )
}