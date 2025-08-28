


export default async function Page({ params }: { params: Promise<{ challenge_slug: string }> }) {
    const { challenge_slug } = await params

    return <></>
}