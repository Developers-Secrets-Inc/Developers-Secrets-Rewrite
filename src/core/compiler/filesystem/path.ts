import { isSome, Maybe, none, some } from '@/core/fn/maybe'
import type { FileSystem, Node } from './types'

export const findNodeByPath = (fs: FileSystem, path: string): Maybe<number> => {
  if (path === '/') {
    return some(fs.root)
  }

  const normalizedPath = path.replace(/^\/|\/$/g, '')
  if (!normalizedPath) return some(fs.root)

  const parts = normalizedPath.split('/')
  let currentIndex = fs.root

  for (const part of parts) {
    const currentNode = fs.nodes[currentIndex]

    if (currentNode.type !== 'folder') {
      return none()
    }

    const childIndex = currentNode.children.find((idx) => fs.nodes[idx].name === part)

    if (childIndex === undefined) {
      return none()
    }

    currentIndex = childIndex
  }

  return some(currentIndex)
}

export const getNodeByPath = (fs: FileSystem, path: string): Maybe<Node> => {
  const idxM = findNodeByPath(fs, path)
  return isSome(idxM) ? some(fs.nodes[idxM.value]) : none()
}

export const list = (fs: FileSystem, path: string): string[] => {
  const nodeM = getNodeByPath(fs, path)

  if (!isSome(nodeM)) {
    throw new Error(`Path not found: ${path}`)
  }
  const node = nodeM.value
  if (node.type !== 'folder') {
    throw new Error(`Not a folder: ${path}`)
  }

  return node.children.map((i) => fs.nodes[i].name)
}

export const getFileContent = (fs: FileSystem, path: string): string => {
  const nodeM = getNodeByPath(fs, path)

  if (!isSome(nodeM)) {
    throw new Error(`File not found: ${path}`)
  }
  const node = nodeM.value
  if (node.type !== 'file') {
    throw new Error(`Not a file: ${path}`)
  }

  return node.content
}
