import Link from 'next/link'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

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
                                        variant="secondary"
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
                                            <circle cx="12" cy="12" r="10" />
                                            <polygon points="10 8 16 12 10 16 10 8" />
                                        </svg>
                                        Overview
                                    </Button>
                                </SheetClose>
                            </Link>

                            <Link href="/products">
                                <SheetClose asChild>
                                    <Button
                                        variant="ghost"
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
                                        Products
                                    </Button>
                                </SheetClose>
                            </Link>

                            <Link href="/orders">
                                <SheetClose asChild>
                                    <Button
                                        variant="ghost"
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
                                            <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                                            <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                                            <circle cx="12" cy="12" r="2" />
                                            <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                                            <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
                                        </svg>
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
