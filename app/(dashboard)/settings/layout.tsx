import { Metadata } from 'next'

import { SidebarNav } from '@/app/(dashboard)/settings/components/sidebar-nav'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
    title: 'Settings',
    description: 'Manage your dashboard appearance preferences.',
}

const sidebarNavItems = [
    {
        title: 'Appearance',
        href: '/settings',
    },
]

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <main className="h-full flex-1 flex-col items-center md:flex">
            <div className="w-full max-w-5xl space-y-6 md:space-y-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Settings
                        </h2>
                        <p className="text-muted-foreground">
                            Manage your dashboard appearance preferences.
                        </p>
                    </div>
                </div>

                <Separator className="my-6" />

                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="lg:w-1/5">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
                    <div className="flex-1 lg:max-w-2xl">{children}</div>
                </div>
            </div>
        </main>
    )
}
