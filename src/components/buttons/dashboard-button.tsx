import Link from 'next/link'
import { Button } from '../ui/button'

export const DashboardButton = () => {
  return (
    <Button variant="outline" size="sm" asChild>
      <Link href="/home">Dashboard</Link>
    </Button>
  )
}
