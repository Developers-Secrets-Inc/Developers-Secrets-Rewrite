import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { FilePlus, FolderPlus } from 'lucide-react'

export const ExplorerContextMenu = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="h-full w-full">{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => onClick()}>
          <FilePlus className="mr-2 h-4 w-4" />
          <span>New File</span>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => onClick()}>
          <FolderPlus className="mr-2 h-4 w-4" />
          <span>New Folder</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
