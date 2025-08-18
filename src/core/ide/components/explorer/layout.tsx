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

export const IDEExplorerLayout = {
  Root: IDEExplorerRoot,
  Header: IDEExplorerHeader,
  Content: undefined,
}
