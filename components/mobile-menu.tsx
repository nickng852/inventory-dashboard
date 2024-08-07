'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

import { navItems } from '@/components/nav-item'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
} from '@/components/ui/sheet'

export default function MobileMenu() {
    const pathname = usePathname()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" className="h-8 w-8 rounded-full">
                    <HamburgerMenuIcon className="h-4 w-4" />
                </Button>
            </SheetTrigger>

            <SheetContent side={'left'} className="flex flex-col justify-end">
                <SheetHeader>
                    <SheetDescription>
                        <div className="mt-10 flex flex-col gap-2">
                            {navItems.map((navItem, index) => (
                                <Link key={navItem.id} href={navItem.href}>
                                    <SheetClose asChild>
                                        <Button
                                            variant={
                                                pathname === navItem.href
                                                    ? 'secondary'
                                                    : 'ghost'
                                            }
                                            className="w-full justify-start"
                                        >
                                            {
                                                <navItem.icon className="mr-2 h-4 w-4" />
                                            }
                                            {navItem.title}
                                        </Button>
                                    </SheetClose>
                                </Link>
                            ))}
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
