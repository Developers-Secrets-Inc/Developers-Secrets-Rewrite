import { TreeItem, TreeItemLabel } from '@/components/tree'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { FileSystemNode } from '@/core/ide/types'
import { ItemInstance } from '@headless-tree/core'
import { FilePlus, FolderIcon, FolderOpenIcon, FolderPlus, Lock } from 'lucide-react'

export const ExplorerFolder = ({
  item,
  canModifyFolder,
  isFolderLocked,
  handleOpenDialog,
}: {
  item: ItemInstance<FileSystemNode>
  canModifyFolder: boolean
  isFolderLocked: boolean
  handleOpenDialog: (type: 'file' | 'folder', folderId: string) => void
}) => {
  return (
    <ContextMenu key={item.getId()}>
      <ContextMenuTrigger>
        <TreeItem item={item} className="w-full">
          <TreeItemLabel className="relative before:absolute before:inset-x-0 before:-z-10 before:bg-background">
            <span className="-order-1 flex flex-1 items-center gap-2">
              {item.isExpanded() ? (
                <FolderOpenIcon className="pointer-events-none size-4 text-muted-foreground" />
              ) : (
                <FolderIcon className="pointer-events-none size-4 text-muted-foreground" />
              )}
              {item.getItemName()}
              {isFolderLocked && <Lock className="size-3 text-muted-foreground ml-1" />}
            </span>
          </TreeItemLabel>
        </TreeItem>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {canModifyFolder && (
          <>
            <ContextMenuItem onClick={() => handleOpenDialog('file', item.getId())}>
              <FilePlus className="mr-2 h-4 w-4" />
              <span>New File</span>
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleOpenDialog('folder', item.getId())}>
              <FolderPlus className="mr-2 h-4 w-4" />
              <span>New Folder</span>
            </ContextMenuItem>
          </>
        )}
        {!canModifyFolder && (
          <ContextMenuItem disabled>
            <Lock className="mr-2 h-4 w-4" />
            <span>Folder is locked</span>
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  )
}
