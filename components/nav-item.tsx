import { PanelsTopLeft } from 'lucide-react'
import { CubeIcon, ReaderIcon } from '@radix-ui/react-icons'

export const navItems = [
    {
        id: 'overview',
        title: 'Overview',
        href: '/',
        icon: PanelsTopLeft,
    },
    {
        id: 'products',
        title: 'Products',
        href: '/products',
        icon: CubeIcon,
    },
    {
        id: 'orders',
        title: 'Orders',
        href: '/orders',
        icon: ReaderIcon,
    },
]
