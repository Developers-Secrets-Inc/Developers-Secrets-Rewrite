import { Separator } from "@/components/ui/separator"

const AuthCardRoot = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
    return (
        <div {...props} className={className}>
            {children}
        </div>
    )
}

const AuthCardHeader = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="mb-6">
            {children}
        </div>
    )
}

const AuthCardTitle = ({ children }: { children: React.ReactNode }) => {
    return (
        <h1 className="text-2xl font-bold">{children}</h1>
    )
}

const AuthCardDescription = ({ children }: { children: React.ReactNode }) => {
    return (
        <p className="text-muted-foreground">{children}</p>
    )
}

const AuthCardForm = ({ children, onSubmit }: { children: React.ReactNode, onSubmit: () => void }) => {
    return (
        <form onSubmit={onSubmit} className="space-y-4">{children}</form>
    )
}

const AuthCardContinueWithSeparator = () => {
    return (
        <div className="relative my-6">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-background px-2 text-muted-foreground text-sm">
                    Or continue with
                </span>
            </div>
        </div>
    )
}

export const AuthCard = {
    Root: AuthCardRoot,
    Header: AuthCardHeader,
    Title: AuthCardTitle,
    Description: AuthCardDescription,
    Form: AuthCardForm,
    ContinueWithSeparator: AuthCardContinueWithSeparator,
}