import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { ChevronLeft, ChevronRight } from 'lucide-react'

export const NavigationArticles = () => {
  return (
    <div className="flex justify-between gap-2">
      <Button variant="outline" className="flex-1 w-full h-auto p-4 justify-start" asChild>
        <Link href="#" className="w-full">
          <div className="flex flex-col gap-2 items-start text-left w-full">
            <div className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Previous Article</span>
            </div>
            <p className="text-sm text-muted-foreground leading-tight">
              Go to the previous article
            </p>
          </div>
        </Link>
      </Button>
      <Button variant="outline" className="flex-1 w-full h-auto p-4 justify-end" asChild>
        <Link href="#" className="w-full">
          <div className="flex flex-col gap-2 items-end text-right w-full">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">Next Article</span>
              <ChevronRight className="h-4 w-4" />
            </div>
            <p className="text-sm text-muted-foreground leading-tight">
              Continue to the next article
            </p>
          </div>
        </Link>
      </Button>
    </div>
  )
}
