import type { IDEState } from '../store/use-ide-store'
import type { FileSystemState } from '../types/file-system-state'
import type { FileSystemNode } from '../types'
import type { Language } from '../../compiler/types'
import { getLanguageFromExtension } from '../utils'
import { IDETab } from '../types'

export const extractEditorContent = (state: IDEState): Record<string, string> => {
  const editorContent: Record<string, string> = {}
  
  // Extract content from file tree using updateNodeContent
  if (state.updateNodeContent) {
    // For now, we'll get content from open tabs and find corresponding nodes
    state.openTabs.forEach(tab => {
      // Find the file node in the file tree
      const findNodeContent = (nodes: FileSystemNode[]): string | null => {
        for (const node of nodes) {
          if (node.type === 'file' && node.id === tab.fileId) {
            return node.content
          }
          if (node.type === 'folder') {
            const content = findNodeContent(node.children)
            if (content) return content
          }
        }
        return null
      }
      
      const content = findNodeContent(state.fileTree)
      if (content) {
        editorContent[tab.fileId] = content
      }
    })
  }
  
  return editorContent
}

export const restoreEditorContent = (state: IDEState, content: Record<string, string>): void => {
  // Update editor content for each file
  if (state.updateNodeContent) {
    Object.entries(content).forEach(([fileId, fileContent]) => {
      state.updateNodeContent(fileId, fileContent)
    })
  }
}

// Helper to convert IDETab to our Tab format
const convertIDETabToTab = (tab: IDETab): any => {
  return {
    id: tab.id,
    fileId: tab.fileId,
    fileName: tab.fileName,
    language: tab.language
  }
}

export const isEqual = (left: FileSystemState, right: FileSystemState): boolean => {
  if (!left && !right) return true
  if (!left || !right) return false
  
  // Compare fileTree
  if (left.fileTree.length !== right.fileTree.length) return false
  
  const leftTreeMap = new Map<string, FileSystemNode>()
  const rightTreeMap = new Map<string, FileSystemNode>()
  
  // Build maps for comparison
  const buildTreeMap = (nodes: FileSystemNode[], map: Map<string, FileSystemNode>) => {
    nodes.forEach(node => {
      map.set(node.id, node)
      if (node.type === 'folder') {
        buildTreeMap(node.children, map)
      }
    })
  }
  
  buildTreeMap(left.fileTree, leftTreeMap)
  buildTreeMap(right.fileTree, rightTreeMap)
  
  // Compare each node
  for (const [id, leftNode] of leftTreeMap) {
    const rightNode = rightTreeMap.get(id)
    if (!rightNode) return false
    
    // Compare basic properties
    if (leftNode.name !== rightNode.name) return false
    if (leftNode.type !== rightNode.type) return false
    if (leftNode.locked !== rightNode.locked) return false
    if (leftNode.language !== rightNode.language) return false
    
    // Compare content for files
    if (leftNode.type === 'file') {
      if (leftNode.content !== rightNode.content) return false
    }
    
    // Compare children count for folders
    if (leftNode.type === 'folder') {
      if (leftNode.children.length !== rightNode.children.length) return false
    }
  }
  
  // Compare activeFileId
  if (left.activeFileId !== right.activeFileId) return false
  
  // Compare openTabs - convert IDETab to our Tab format if needed
  const leftTabs = left.openTabs.map(tab => convertIDETabToTab(tab))
  const rightTabs = right.openTabs.map(tab => convertIDETabToTab(tab))
  
  if (leftTabs.length !== rightTabs.length) return false
  
  const leftTabsMap = new Map(leftTabs.map(tab => [tab.fileId, tab]))
  const rightTabsMap = new Map(rightTabs.map(tab => [tab.fileId, tab]))
  
  for (const [fileId, leftTab] of leftTabsMap) {
    const rightTab = rightTabsMap.get(fileId)
    if (!rightTab) return false
    
    if (leftTab.id !== rightTab.id) return false
    if (leftTab.fileName !== rightTab.fileName) return false
    if (leftTab.language !== rightTab.language) return false
  }
  
  // Compare editorContent
  const leftContentKeys = Object.keys(left.editorContent)
  const rightContentKeys = Object.keys(right.editorContent)
  
  if (leftContentKeys.length !== rightContentKeys.length) return false
  
  for (const key of leftContentKeys) {
    if (left.editorContent[key] !== right.editorContent[key]) return false
  }
  
  // Compare lastModified (within 1 second tolerance)
  const timeDiff = Math.abs(left.lastModified.getTime() - right.lastModified.getTime())
  if (timeDiff > 1000) return false
  
  return true
}