import type { FileSystem, VirtualFS } from './types'
import { createFileSystem, addFile, addFolder } from './primitives'

export const fromVirtualFS = (virtualFS: VirtualFS): FileSystem => {
  let fs = createFileSystem()

  function build(currentFs: FileSystem, parentIndex: number, vfsNode: VirtualFS): FileSystem {
    return Object.entries(vfsNode).reduce((accFs, [name, content]) => {
      if (typeof content === 'string') {
        return addFile(accFs, parentIndex, name, content)
      } else {
        const [nextFs, newFolderIndex] = addFolder(accFs, parentIndex, name)
        return build(nextFs, newFolderIndex, content)
      }
    }, currentFs)
  }

  return build(fs, fs.root, virtualFS)
}
