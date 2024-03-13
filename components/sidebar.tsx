'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CubeIcon, ReaderIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const pathname = usePathname()

    return (
        <div className={className}>
            <div className="py-16">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Discover
                    </h2>
                    <div className="flex flex-col gap-2">
                        <Link href="/">
                            <Button
                                variant={
                                    pathname === '/' ? 'secondary' : 'ghost'
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
                        </Link>

                        <Link href="/products">
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
                        </Link>

                        <Link href="/orders">
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
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
