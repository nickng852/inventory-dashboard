import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

import { deleteOrder } from '@/app/(dashboard)/(orders)/lib/action'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'

export default function DataTableActions({ orderId }: { orderId: string }) {
    const { toast } = useToast()

    const onSubmit = async (orderId: string) => {
        try {
            await deleteOrder(orderId)
            toast({
                description: 'Order deleted successfully.',
            })
        } catch (err) {
            console.log(err)
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description:
                    err instanceof Error
                        ? err.message
                        : 'An unknown error occurred',
            })
        }
    }

    return (
        <AlertDialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <Link href={`/order/${orderId}/edit`}>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </Link>
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem>
                            <span className="text-red-600">Delete</span>
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onSubmit(orderId)}>
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
