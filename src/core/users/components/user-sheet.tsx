import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { getUser } from '@/core/auth'
import { isFailure } from '@/core/fn/result'
import { MenuIcon, UserIcon, CreditCardIcon, NewspaperIcon, MessageSquareIcon, LogOutIcon } from 'lucide-react'
import Link from 'next/link'
import { UserAvatar } from '@/core/auth/components/user-avatar'
import type { User } from '@supabase/supabase-js'
import { Separator } from '@/components/ui/separator'

const AuthButtons = ({ user }: { user: Awaited<ReturnType<typeof getUser>> }) => {
  return (
    <div className="pt-8 flex flex-col gap-2">
      {isFailure(user) ? (
        <>
          <Button asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
        </>
      ) : (
        <>
          <Button asChild>
            <Link href="/pricing">Upgrade to PRO</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/home">Dashboard</Link>
          </Button>
        </>
      )}
    </div>
  )
}


const UserMenu = ({ user }: { user: User }) => {
  return (
    <div className="px-4 w-full">
      <div className="flex items-center justify-between py-2">
        <span className="text-base text-foreground truncate">{user.email}</span>
        <UserAvatar user={user} />
      </div>
      <nav className="mt-2 flex flex-col">
        <Link
          href="/profile"
          className="flex w-full items-center justify-between py-3 text-base text-muted-foreground hover:text-primary-foreground cursor-pointer"
        >
          <span>Profile</span>
          <UserIcon className="size-4" />
        </Link>
        <Link
          href="/pricing"
          className="flex w-full items-center justify-between py-3 text-base text-muted-foreground hover:text-primary-foreground cursor-pointer"
        >
          <span>Pricing</span>
          <CreditCardIcon className="size-4" />
        </Link>
        <Link
          href="/blog"
          className="flex w-full items-center justify-between py-3 text-base text-muted-foreground hover:text-primary-foreground cursor-pointer"
        >
          <span>Blog</span>
          <NewspaperIcon className="size-4" />
        </Link>
        <Link
          href="/feedback"
          className="flex w-full items-center justify-between py-3 text-base text-muted-foreground hover:text-primary-foreground cursor-pointer"
        >
          <span>Feedback</span>
          <MessageSquareIcon className="size-4" />
        </Link>
        <Link
          href="/logout"
          className="flex w-full items-center justify-between py-3 text-base text-muted-foreground hover:text-primary-foreground cursor-pointer"
        >
          <span>Logout</span>
          <LogOutIcon className="size-4" />
        </Link>
      </nav>
    </div>
  )
}


export const UserSheet = async ({ className }: { className?: string }) => {
  const user = await getUser()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={'icon'} className={className}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-none sm:max-w-none">
        <SheetHeader>
          <AuthButtons user={user} />
        </SheetHeader>
        {!isFailure(user) && (
          <>
            <UserMenu user={user.value} />
            <Separator className="px-4" />
          </>
        )}
        <div className="flex gap-2 px-4 w-full">
          <Accordion type="single" className="w-full flex-1 basis-full">
            <AccordionItem value="articles" className="border-0 w-full">
              <AccordionTrigger className="text-muted-foreground text-base w-full">
                Articles
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                <p>Profile content</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="courses" className="border-0 w-full">
              <AccordionTrigger className="text-muted-foreground text-base w-full">
                Courses
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                <p>Profile content</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// profile, settings, pricing, blog, feedback, logout
