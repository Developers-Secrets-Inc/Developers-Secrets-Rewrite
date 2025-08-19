'use client'

import { hotkeysCoreFeature, syncDataLoaderFeature } from '@headless-tree/core'
import { useTree } from '@headless-tree/react'
import { useEffect, useMemo, useState } from 'react'
import { useIDEStore } from '../store/use-ide-store'
import { FileSystemNode } from '../types'
import { Language } from '@/core/compiler/types'
import { getLanguageFromExtension } from '../utils'

const indent = 20

export const useExplorerTree = () => {
  const { fileTree, setActiveFileId, replaceActiveTab } = useIDEStore()

  const [expandedItems, setExpandedItems] = useState<string[]>(['root'])
  const [focusedItem, setFocusedItem] = useState<string | null>(null)

  const items = useMemo(() => {
    const flatTree: Record<string, FileSystemNode> = {}
    function traverse(nodes: FileSystemNode[]) {
      for (const node of nodes) {
        flatTree[node.id] = node
        if (node.type === 'folder') {
          traverse(node.children)
        }
      }
    }
    if (fileTree && fileTree.length > 0) {
      traverse(fileTree)
    }
    return flatTree
  }, [fileTree])

  const tree = useTree<FileSystemNode>({
    indent,
    rootItemId: 'root',
    state: { expandedItems, focusedItem },
    setExpandedItems,
    setFocusedItem,
    getItemName: (item) => item.getItemData().name,
    isItemFolder: (item) => item.getItemData().type === 'folder',
    dataLoader: {
      getItem: (itemId) => {
        if (itemId === 'root') {
          return {
            id: 'root',
            name: 'root',
            type: 'folder',
            children: fileTree || [],
          } as FileSystemNode
        }
        return items[itemId]
      },
      getChildren: (itemId) => {
        if (itemId === 'root') {
          return fileTree ? fileTree.map((node) => node.id) : []
        }
        const item = items[itemId]
        if (item?.type === 'folder') {
          return item.children.map((child) => child.id)
        }
        return []
      },
    },
    features: [syncDataLoaderFeature, hotkeysCoreFeature],
    onPrimaryAction: (item) => {
      if (!item.isFolder()) {
        const fileData = item.getItemData()
        const fileExtension = fileData.name.split('.').pop() || ''
        const language = getLanguageFromExtension(fileExtension)

        replaceActiveTab({
          id: crypto.randomUUID(),
          fileId: item.getId(),
          fileName: fileData.name,
          language: language as Language,
        })
        setActiveFileId(item.getId())
      }
    },
  })

  useEffect(() => {
    if (fileTree && fileTree.length > 0) {
      tree.rebuildTree()
    }
  }, [fileTree, tree])

  return tree
}
