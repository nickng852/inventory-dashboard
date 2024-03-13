'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HamburgerMenuIcon, CubeIcon, ReaderIcon } from '@radix-ui/react-icons'

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
                            <Link href="/">
                                <SheetClose asChild>
                                    <Button
                                        variant={
                                            pathname === '/'
                                                ? 'secondary'
                                                : 'ghost'
                                        }
                                        className="w-full justify-start"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="mr-2 h-4 w-4"
                                        >
                                            <rect
                                                width="7"
                                                height="7"
                                                x="3"
                                                y="3"
                                                rx="1"
                                            />
                                            <rect
                                                width="7"
                                                height="7"
                                                x="14"
                                                y="3"
                                                rx="1"
                                            />
                                            <rect
                                                width="7"
                                                height="7"
                                                x="14"
                                                y="14"
                                                rx="1"
                                            />
                                            <rect
                                                width="7"
                                                height="7"
                                                x="3"
                                                y="14"
                                                rx="1"
                                            />
                                        </svg>
                                        Overview
                                    </Button>
                                </SheetClose>
                            </Link>

                            <Link href="/products">
                                <SheetClose asChild>
                                    <Button
                                        variant={
                                            pathname === '/products'
                                                ? 'secondary'
                                                : 'ghost'
                                        }
                                        className="w-full justify-start"
                                    >
                                        <CubeIcon className="mr-2" />
                                        Products
                                    </Button>
                                </SheetClose>
                            </Link>

                            <Link href="/orders">
                                <SheetClose asChild>
                                    <Button
                                        variant={
                                            pathname === '/orders'
                                                ? 'secondary'
                                                : 'ghost'
                                        }
                                        className="w-full justify-start"
                                    >
                                        <ReaderIcon className="mr-2" />
                                        Orders
                                    </Button>
                                </SheetClose>
                            </Link>
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
