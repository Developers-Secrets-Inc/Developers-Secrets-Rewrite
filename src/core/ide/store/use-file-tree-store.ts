import type { StateCreator } from 'zustand'
import type { FileSystemNode } from '../types'
import { getLanguageFromExtension } from '../utils'

export type FileTreeState = {
  fileTree: FileSystemNode[]

  setFileTree: (fileTree: FileSystemNode[]) => void
  updateNodeContent: (id: string, content: string) => void
  addFile: (parentId: string, fileName: string, autoOpen?: boolean) => string
  addFolder: (parentId: string, folderName: string, autoOpen?: boolean) => void
  isNodeLocked: (id: string) => boolean
  isNodeOrParentLocked: (id: string) => boolean
  canModifyNode: (id: string) => boolean
  resetTree: () => void
}

const addNodeToTree = (
  nodes: FileSystemNode[],
  parentId: string,
  newNode: FileSystemNode,
): FileSystemNode[] => {
  return nodes.map((node) => {
    if (node.id === parentId && node.type === 'folder') {
      return { ...node, children: [...node.children, newNode] }
    }
    if (node.type === 'folder') {
      return { ...node, children: addNodeToTree(node.children, parentId, newNode) }
    }
    return node
  })
}

const updateNodeInTree = (
  nodes: FileSystemNode[],
  id: string,
  content: string,
): FileSystemNode[] => {
  return nodes.map((node) => {
    if (node.id === id && node.type === 'file') {
      return { ...node, content }
    }
    if (node.type === 'folder') {
      return { ...node, children: updateNodeInTree(node.children, id, content) }
    }
    return node
  })
}

// Utility function to find a node by ID in the file system tree
const findNodeInTree = (nodes: FileSystemNode[], id: string): FileSystemNode | null => {
  for (const node of nodes) {
    if (node.id === id) {
      return node
    }
    if (node.type === 'folder') {
      const found = findNodeInTree(node.children, id)
      if (found) return found
    }
  }
  return null
}

// Utility function to check if a node or any of its parents are locked
const isNodeOrParentLockedInTree = (
  nodes: FileSystemNode[],
  id: string,
  parentPath: FileSystemNode[] = [],
): boolean => {
  // Check if any parent in the current path is locked
  if (parentPath.some((parent) => parent.locked)) {
    return true
  }

  for (const node of nodes) {
    if (node.id === id) {
      // Found the target node, check if it or any parent is locked
      return node.locked || parentPath.some((parent) => parent.locked)
    }
    if (node.type === 'folder') {
      const found = isNodeOrParentLockedInTree(node.children, id, [...parentPath, node])
      if (found) return found
    }
  }
  return false
}

export const createFileTreeSlice: StateCreator<FileTreeState> = (set, get) => ({
  fileTree: [],
  setFileTree: (fileTree) => set({ fileTree }),
  updateNodeContent: (id, content) =>
    set((state) => ({
      ...state,
      fileTree: updateNodeInTree(state.fileTree, id, content),
    })),
  addFile: (parentId, fileName, autoOpen = false) => {
    const newFileId = crypto.randomUUID()
    const fileExtension = fileName.split('.').pop() || ''
    const language = getLanguageFromExtension(fileExtension)

    const newFile: FileSystemNode = {
      id: newFileId,
      name: fileName,
      type: 'file',
      content: '',
      language: language,
    }
    
    set((state) => {
      if (parentId === 'root') {
        return { fileTree: [...state.fileTree, newFile] }
      }
      return { fileTree: addNodeToTree(state.fileTree, parentId, newFile) }
    })
    
    return newFileId
  },
  addFolder: (parentId, folderName, autoOpen = false) =>
    set((state) => {
      const newFolder: FileSystemNode = {
        id: crypto.randomUUID(),
        name: folderName,
        type: 'folder',
        children: [],
      }
      if (parentId === 'root') {
        return { fileTree: [...state.fileTree, newFolder] }
      }
      return { fileTree: addNodeToTree(state.fileTree, parentId, newFolder) }
    }),
  isNodeLocked: (id: string): boolean => {
    const state = get()
    const node = findNodeInTree(state.fileTree, id)
    return node?.locked || false
  },
  isNodeOrParentLocked: (id: string): boolean => {
    const state = get()
    return isNodeOrParentLockedInTree(state.fileTree, id)
  },
  canModifyNode: (id: string): boolean => {
    const state = get()
    return !isNodeOrParentLockedInTree(state.fileTree, id)
  },
  resetTree: () =>
    set({
      fileTree: [],
    }),
})
