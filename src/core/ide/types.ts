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
  language: string
}

export type FileSystemNode = FileNode | FolderNode

// -------- Optional initialization config types --------
// Paths are absolute from '/', folders are inferred from the path
export type IDEInitialFile = {
  path: `/${string}`
  content?: string
  locked?: boolean
}

export type IDEInitialConfig = {
  files?: IDEInitialFile[]
  openTabs?: (`/${string}`)[]
  activeTab?: `/${string}`
  explorer?: { open?: boolean }
}
