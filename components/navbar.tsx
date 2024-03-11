import Auth from './auth'
import { ModeToggle } from './theme/mode-toggle'

export default function Navbar() {
    return (
        <div className="sticky top-0 z-10 border-b bg-background">
            <div className="flex h-16 items-center px-4">
                <div className="ml-auto flex items-center space-x-4">
                    <ModeToggle />
                    <Auth />
                </div>
            </div>
        </div>
    )
}
