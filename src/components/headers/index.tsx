const HeaderRoot = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="flex z-40 sticky top-0 bg-background h-14 shrink-0 items-center gap-2 border-b px-4">
      {children}
    </header>
  )
}

const HeaderLeft = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center gap-2">{children}</div>
}

const HeaderRight = ({ children }: { children: React.ReactNode }) => {
  return <div className="ml-auto flex items-center gap-2">{children}</div>
}

export const Header = {
  Root: HeaderRoot,
  Left: HeaderLeft,
  Right: HeaderRight,
}
