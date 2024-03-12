export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex flex-col items-center p-4 md:p-10">
            {children}
        </section>
    )
}
