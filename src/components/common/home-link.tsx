import { AppIcon } from "../icons/app-icon"
import Link from "next/link"

export const HomeLink = () => {
    return (
        <Link href="/">
            <AppIcon />
        </Link>
    )
}