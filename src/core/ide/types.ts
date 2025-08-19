import { Language } from '../compiler/types'

export type FileNode = {
  id: string
  type: 'file'
  name: string
  content: string
  language: string
  readonly locked?: boolean
}

export type FolderNode = {
  id: string
  type: 'folder'
  name: string
  children: FileSystemNode[]
  readonly locked?: boolean
}

export type IDETab = {
  id: string
  fileId: string
  fileName: string
  language: Language
}

export type FileSystemNode = FileNode | FolderNode
