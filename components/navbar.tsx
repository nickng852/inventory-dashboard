import { auth } from '@clerk/nextjs/server'

import Auth from './auth'
import MobileMenu from './mobile-menu'

export default function Navbar() {
    const { userId } = auth()

    return (
        <div className="sticky top-0 z-10 border-b bg-background">
            <div className="flex h-16 items-center px-4">
                <div className="md:hidden">
                    <MobileMenu userId={userId ?? ''} />
                </div>

                <div className="ml-auto flex items-center">
                    <Auth />
                </div>
            </div>
        </div>
    )
}
