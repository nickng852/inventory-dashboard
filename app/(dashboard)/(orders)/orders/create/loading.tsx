import { Loader2 } from 'lucide-react'

export default function Loading() {
    return (
        <div className="flex min-h-[50vh] flex-grow items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
        </div>
    )
}
