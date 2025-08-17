


export default async function Page({ params }: { params: Promise<{ article_slug: string }> }) {
    const { article_slug } = await params

    return (
        <div>
            <h1>Article {article_slug}</h1>
        </div>
    )
}