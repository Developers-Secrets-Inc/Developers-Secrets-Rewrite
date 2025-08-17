import { Button } from '@/components/ui/button'
import { Cross } from '@/components/icons/cross'

export const BlogCTA = () => {
  return (
    <div className="relative border-x border-b px-4">
      <Cross className="absolute left-0 top-0 -translate-y-1/2 -translate-x-1/2 z-0" />
      <Cross className="absolute right-0 bottom-0 translate-y-1/2 translate-x-1/2 z-0" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:divide-x md:divide-dashed md:divide-border">
        <div className="md:col-span-2 text-left space-y-4 py-8">
          <h2 className="text-2xl">
            Ready to deploy? Start building with a free account. Speak to an expert for your Pro or
            Enterprise needs.
          </h2>
          <div className="flex items-center justify-start gap-3">
            <Button size="lg">Subscribe</Button>
            <Button variant="outline" size="lg">
              Contact us
            </Button>
          </div>
        </div>
        <div className="md:col-span-1 text-left space-y-3 py-8">
          <p className="text-sm text-muted-foreground">
            Stay in the loop with product updates, engineering posts, and company news. No spam,
            unsubscribe anytime.
          </p>
          <Button variant="outline" size="lg">
            Learn more
          </Button>
        </div>
      </div>
    </div>
  )
}
