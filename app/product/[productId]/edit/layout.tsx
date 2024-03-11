export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex flex-col items-center p-8">{children}</section>
    )
}
