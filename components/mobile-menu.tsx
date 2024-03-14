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
                <Button size="icon" className="rounded-full">
                    <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem]" />
                </Button>
            </SheetTrigger>
            <SheetContent side={'left'}>
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
