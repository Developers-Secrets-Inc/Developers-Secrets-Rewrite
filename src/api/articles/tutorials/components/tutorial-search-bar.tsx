import { SearchIcon } from 'lucide-react'
import { useId } from 'react'

import { Input } from '@/components/ui/input'

export const TutorialSearchBar = () => {
  const id = useId()
  return (
    <div className="relative">
      <Input id={id} className="peer ps-9 pe-9" placeholder="Search..." type="search" disabled />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
        <SearchIcon size={16} />
      </div>
    </div>
  )
}
