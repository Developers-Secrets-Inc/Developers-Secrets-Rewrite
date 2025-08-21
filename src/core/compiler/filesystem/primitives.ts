import type { FileSystem, FolderNode, FileNode, Node } from './types'

export const createFileSystem = (): FileSystem => {
  const rootNode: FolderNode = { type: 'folder', name: '/', children: [] }
  return {
    nodes: [rootNode],
    root: 0,
  }
}

export const addFile = (
  fs: FileSystem,
  parentIndex: number,
  name: string,
  content: string,
): FileSystem => {
  const parentNode = fs.nodes[parentIndex]
  if (parentNode.type !== 'folder') {
    throw new Error(`Invalid parent: Node at index ${parentIndex} is not a folder.`)
  }

  const fileNode: FileNode = { type: 'file', name, content, size: content.length }
  const fileIndex = fs.nodes.length

  const newNodes: Node[] = [...fs.nodes, fileNode]

  const newParentNode: FolderNode = {
    ...parentNode,
    children: [...parentNode.children, fileIndex],
  }

  newNodes[parentIndex] = newParentNode

  return {
    ...fs,
    nodes: newNodes,
  }
}

export const addFolder = (fs: FileSystem, parentIndex: number, name: string): [FileSystem, number] => {
  const parentNode = fs.nodes[parentIndex]
  if (parentNode.type !== 'folder') {
    throw new Error(`Invalid parent: Node at index ${parentIndex} is not a folder.`)
  }

  const folderNode: FolderNode = { type: 'folder', name, children: [] }
  const folderIndex = fs.nodes.length

  const newNodes: Node[] = [...fs.nodes, folderNode]

  const newParentNode: FolderNode = {
    ...parentNode,
    children: [...parentNode.children, folderIndex],
  }

  newNodes[parentIndex] = newParentNode

  const newFs: FileSystem = {
    ...fs,
    nodes: newNodes,
  }

  return [newFs, folderIndex]
}
