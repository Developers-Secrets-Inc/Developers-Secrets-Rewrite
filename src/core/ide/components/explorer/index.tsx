'use client'

import { Tree } from '@/components/tree'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useExplorerTree } from '@/core/ide/hooks/use-explorer-tree'
import { useIDEStore } from '@/core/ide/store/use-ide-store'
import { useState } from 'react'
import { ExplorerContextMenu } from './context-menu'
import { ExplorerFile } from './file'
import { ExplorerFolder } from './folder'
import { IDEExplorerLayout } from './layout'
import { NewFileTooltip, NewFolderTooltip } from './tooltips'

const indent = 20

const CreationDialog = ({
  isOpen,
  onClose,
  type,
  onCreate,
  name,
  setName,
}: {
  isOpen: boolean
  onClose: () => void
  type: 'file' | 'folder'
  onCreate: (name: string) => void
  setName: (name: string) => void
  name: string
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create {type}</DialogTitle>
        </DialogHeader>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onCreate(name)
            }
          }}
          placeholder={`Enter ${type} name`}
        />
        <DialogFooter>
          <Button onClick={() => onCreate(name)}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const ExplorerTree = ({
  handleOpenDialog,
}: {
  handleOpenDialog: (type: 'file' | 'folder', folderId: string) => void
}) => {
  const tree = useExplorerTree()

  const { canModifyNode, openTabs, activeFileId, openTab, setActiveFileId } = useIDEStore()

  return (
    <Tree
      className="relative before:absolute before:inset-0 before:-ms-1 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
      indent={indent}
      tree={tree}
    >
      {tree
        .getItems()
        .filter((item) => item.getId() !== 'root')
        .map((item) => {
          const data = item.getItemData()
          const isLocked = data.locked || false

          switch (data.type) {
            case 'folder':
              const canModifyFolder = canModifyNode(item.getId())
              return (
                <ExplorerFolder
                  key={item.getId()}
                  item={item}
                  isFolderLocked={isLocked}
                  canModifyFolder={canModifyFolder}
                  handleOpenDialog={handleOpenDialog}
                />
              )
            case 'file':
              const isFileOpen = openTabs.some((tab) => tab.fileId === item.getId())
              const isActiveFile = activeFileId === item.getId()

              return (
                <ExplorerFile
                  key={item.getId()}
                  item={item}
                  isActiveFile={isActiveFile}
                  isFileOpen={isFileOpen}
                  isFileLocked={isLocked}
                />
              )
          }
        })}
    </Tree>
  )
}

export const IDEExplorer = () => {
  const [createType, setCreateType] = useState<'file' | 'folder' | null>(null)
  const [parentId, setParentId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [name, setName] = useState('')

  const { canModifyNode, addFile, addFolder, createAndOpenFile } = useIDEStore()

  const handleOpenDialog = (type: 'file' | 'folder', parentId: string) => {
    setCreateType(type)
    setParentId(parentId)
    setDialogOpen(true)
  }

  const handleCreate = () => {
    if (name && createType && parentId) {
      if (parentId !== 'root' && !canModifyNode(parentId)) {
        console.warn('Cannot create in locked folder')
        setDialogOpen(false)
        setName('')
        setCreateType(null)
        setParentId(null)
        return
      }

      if (createType === 'file') {
        createAndOpenFile(parentId, name)
      } else {
        addFolder(parentId, name)
      }
    }

    setDialogOpen(false)
    setName('')
    setCreateType(null)
    setParentId(null)
  }

  return (
    <>
      <IDEExplorerLayout.Root>
        <IDEExplorerLayout.Header>
          <span className="text-sm font-medium">Explorer</span>
          <div className="flex items-center gap-0.5">
            <NewFileTooltip onClick={() => handleOpenDialog('file', 'root')} />
            <NewFolderTooltip onClick={() => handleOpenDialog('folder', 'root')} />
          </div>
        </IDEExplorerLayout.Header>
        <ExplorerContextMenu onClick={handleOpenDialog}>
          <IDEExplorerLayout.Content>
            <ExplorerTree handleOpenDialog={handleOpenDialog} />
          </IDEExplorerLayout.Content>
        </ExplorerContextMenu>
      </IDEExplorerLayout.Root>
      <CreationDialog
        isOpen={dialogOpen}
        name={name}
        setName={setName}
        onClose={() => setDialogOpen(false)}
        type={createType || 'file'}
        onCreate={handleCreate}
      />
    </>
  )
}
