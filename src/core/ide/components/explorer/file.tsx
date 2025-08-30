import { TreeItem, TreeItemLabel } from '@/components/tree'
import { cn } from '@/lib/utils'
import { FileIcon, Lock } from 'lucide-react'
import { FileSystemNode } from '@/core/ide/types'

export const ExplorerFile = ({
  item,
  isActiveFile,
  isFileOpen,
  isFileLocked,
}: {
  item: any // ItemInstance<FileSystemNode>
  isActiveFile: boolean
  isFileOpen: boolean
  isFileLocked: boolean
}) => {
  return (
    <TreeItem key={item.getId()} item={item}>
      <TreeItemLabel
        className={cn(
          'before:bg-background relative before:absolute before:inset-x-0 before:-inset-y-0.5 before:-z-10',
          isActiveFile && 'bg-primary/5 border border-primary/10 text-primary',
          isFileOpen &&
            !isActiveFile &&
            'bg-muted/50 border border-muted/10 text-muted-foreground ',
        )}
      >
        <span className="-order-1 flex flex-1 items-center gap-2">
          <FileIcon
            className={cn(
              'pointer-events-none size-4',
              isActiveFile ? 'text-primary' : 'text-muted-foreground',
            )}
          />
          {item.getItemName()}
          {isFileLocked && (
            <Lock
              className={cn(
                'w-3 h-3 ml-auto',
                isActiveFile ? 'text-primary' : 'text-muted-foreground',
              )}
            />
          )}
          {isFileOpen && !isFileLocked && (
            <div
              className={cn(
                'w-1.5 h-1.5 rounded-full ml-auto',
                isActiveFile ? 'bg-primary' : 'bg-muted-foreground',
              )}
            />
          )}
        </span>
      </TreeItemLabel>
    </TreeItem>
  )
}
