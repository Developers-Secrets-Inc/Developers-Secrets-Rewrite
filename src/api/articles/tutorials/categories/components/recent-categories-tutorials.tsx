import { Button } from "@/components/ui/button"

export const RecentCategoriesTutorials = () => {
    const items = [
        { id: 1, title: 'Modern Form Handling', category: 'React', description: 'Build accessible, type-safe forms with React Hook Form and Zod.' },
        { id: 2, title: 'Next.js Data Fetching', category: 'Next.js', description: 'RSC patterns, caching strategies and streaming UI in production.' },
        { id: 3, title: 'TS Narrowing Patterns', category: 'TypeScript', description: 'Discriminated unions, predicates and exhaustive checks.' },
        { id: 4, title: 'Node Workers & Queues', category: 'Node.js', description: 'Scale background jobs with workers and message queues.' },
        { id: 5, title: 'Testing Async UI', category: 'Testing', description: 'Reliable tests for suspenseful UI and async user flows.' },
        { id: 6, title: 'Image Optimization', category: 'Next.js', description: 'Deliver responsive images with the Next Image component.' },
    ] as const

    const [featured, ...rest] = items
    const sideItems = rest.slice(0, 2)

    return (
        <section>
            <div className="mb-4">
                <h2 className="text-xl font-semibold tracking-tight">Recent Categories Tutorials</h2>
            </div>
            <div className="grid gap-2 lg:grid-cols-2">
                <div>
                    <div className="h-full rounded-lg border p-5 transition-all hover:shadow-md flex flex-col">
                        <div className="mb-2 inline-flex items-center gap-2">
                            <span className="rounded-full bg-accent/30 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                                {featured.category}
                            </span>
                        </div>
                        <h3 className="text-2xl font-semibold leading-tight">
                            {featured.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground flex-1">
                            {featured.description}
                        </p>
                        <div className="mt-4">
                            <Button size="lg" className="w-full">Read more</Button>
                        </div>
                    </div>
                </div>
                <div className="grid h-full grid-rows-[repeat(2,minmax(0,1fr))] gap-2">
                    {sideItems.map((item) => (
                        <div
                            key={item.id}
                            className="h-full rounded-lg border p-4 transition-all hover:shadow-sm"
                        >
                            <div className="mb-1 inline-flex items-center gap-2">
                                <span className="rounded-full bg-accent/30 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                                    {item.category}
                                </span>
                            </div>
                            <h4 className="text-sm font-semibold leading-snug">
                                {item.title}
                            </h4>
                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}