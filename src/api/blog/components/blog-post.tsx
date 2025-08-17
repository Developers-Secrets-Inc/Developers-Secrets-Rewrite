

const BlogPostRoot = ({ children }: { children: React.ReactNode }) => {
    return <div className="mx-auto max-w-5xl border border-border mt-24 py-6 relative">{children}</div>
}

const BlogPostHeader = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex items-center justify-center gap-2 px-4 text-xs sm:text-sm">{children}</div>
}

const BlogPostHero = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>
}

const BlogPostContent = ({ children }: { children: React.ReactNode }) => {
    return <div className="max-w-3xl mx-auto flex flex-col gap-6">{children}</div>
}

export const BlogPost = {
    Root: BlogPostRoot,
    Hero: BlogPostHero,
    Header: BlogPostHeader,
    Content: BlogPostContent
}