'use client'
import { useTheme } from 'next-themes'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const appearanceFormSchema = z.object({
    theme: z.enum(['light', 'dark', 'system'], {
        required_error: 'Please select a theme.',
    }),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

const LightTheme = () => {
    return (
        <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
            <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
            </div>
        </div>
    )
}

const DarkTheme = () => {
    return (
        <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
            <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
            </div>
        </div>
    )
}

export function AppearanceForm() {
    const { theme, setTheme } = useTheme()

    const systemTheme =
        window.matchMedia &&
        (window.matchMedia('(prefers-color-scheme: light)').matches
            ? 'light'
            : 'dark')

    // This can come from your database or API.
    const defaultValues: Partial<AppearanceFormValues> = {
        theme: theme as 'light' | 'dark' | 'system',
    }

    const form = useForm<AppearanceFormValues>({
        resolver: zodResolver(appearanceFormSchema),
        defaultValues,
    })

    function onSubmit(data: AppearanceFormValues) {
        switch (data.theme) {
            case 'light':
                setTheme('light')
                break
            case 'dark':
                setTheme('dark')
                break
            case 'system':
                setTheme('system')
                break
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>Theme</FormLabel>
                            <FormDescription>
                                Select the theme for the dashboard.
                            </FormDescription>
                            <FormMessage />
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid max-w-xs gap-8 pt-2 sm:max-w-md sm:grid-cols-2 xl:max-w-2xl xl:grid-cols-3"
                            >
                                <FormItem>
                                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                        <FormControl>
                                            <RadioGroupItem
                                                value="light"
                                                className="sr-only"
                                            />
                                        </FormControl>
                                        <LightTheme />
                                        <span className="block w-full p-2 text-center font-normal">
                                            Light
                                        </span>
                                    </FormLabel>
                                </FormItem>
                                <FormItem>
                                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                        <FormControl>
                                            <RadioGroupItem
                                                value="dark"
                                                className="sr-only"
                                            />
                                        </FormControl>
                                        <DarkTheme />
                                        <span className="block w-full p-2 text-center font-normal">
                                            Dark
                                        </span>
                                    </FormLabel>
                                </FormItem>
                                <FormItem>
                                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                        <FormControl>
                                            <RadioGroupItem
                                                value="system"
                                                className="sr-only"
                                            />
                                        </FormControl>
                                        {systemTheme === 'light' ? (
                                            <LightTheme />
                                        ) : (
                                            <DarkTheme />
                                        )}
                                        <span className="block w-full p-2 text-center font-normal">
                                            System
                                        </span>
                                    </FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormItem>
                    )}
                />

                <Button type="submit">Update preferences</Button>
            </form>
        </Form>
    )
}
