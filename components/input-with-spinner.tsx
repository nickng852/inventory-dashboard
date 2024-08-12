import * as React from 'react'
import { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    loading?: boolean
    endIcon?: LucideIcon
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, loading, endIcon, ...props }, ref) => {
        const EndIcon = endIcon

        return (
            <div className="relative w-full md:max-w-sm">
                <input
                    type={type}
                    className={cn(
                        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {loading && EndIcon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                        <EndIcon
                            className="animate-spin text-muted-foreground"
                            size={18}
                        />
                    </div>
                )}
            </div>
        )
    }
)
Input.displayName = 'Input'

export { Input }
