'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { navItems } from '@/components/nav-item'
import { Button } from '@/components/ui/button'

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const pathname = usePathname()
    const [active, setActive] = useState(pathname)

    return (
        <div className={className}>
            <div className="py-16">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Discover
                    </h2>
                    <div className="flex flex-col gap-2">
                        {navItems.map((navItem) => (
                            <Link key={navItem.id} href={navItem.href}>
                                <Button
                                    variant={
                                        active === navItem.href
                                            ? 'secondary'
                                            : 'ghost'
                                    }
                                    className="w-full justify-start"
                                    onClick={() => setActive(navItem.href)}
                                >
                                    {<navItem.icon className="mr-2 h-4 w-4" />}
                                    {navItem.title}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
