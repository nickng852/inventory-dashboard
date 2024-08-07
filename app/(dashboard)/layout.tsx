import Navbar from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64 md:border-r">
                <Sidebar className="hidden md:block" />
            </div>

            <div className="flex-grow md:overflow-y-auto">
                <Navbar />
                <div className="p-4 md:p-10">{children}</div>
            </div>
        </div>
    )
}
