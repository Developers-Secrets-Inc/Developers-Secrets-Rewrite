export type FileNode = Readonly<{
  type: 'file'
  name: string
  content: string
  size: number
}>

export type FolderNode = Readonly<{
  type: 'folder'
  name: string
  children: readonly number[]
}>

export type Node = FileNode | FolderNode

export type FileSystem = Readonly<{
  nodes: readonly Node[]
  root: number
}>

export type VirtualFS = {
  [path: string]: string | VirtualFS
}
