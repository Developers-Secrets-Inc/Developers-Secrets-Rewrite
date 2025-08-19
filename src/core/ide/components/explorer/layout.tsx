const IDEExplorerRoot = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const IDEExplorerHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row items-center justify-between border-b h-12 border-border p-2 text-muted-foreground">
      {children}
    </div>
  )
}

const IDEExplorerContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-2">
      <div className="flex h-full flex-col gap-2">
        <div>{children}</div>
      </div>
    </div>
  )
}

export const IDEExplorerLayout = {
  Root: IDEExplorerRoot,
  Header: IDEExplorerHeader,
  Content: IDEExplorerContent,
}
