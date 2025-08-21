import { Language } from '@/core/compiler/types'
import { IDEInitialFile, IDETab, FileNode, FolderNode, FileSystemNode } from './types'
import { getLanguageFromExtension, generateFilePath } from './utils'

function coerceToLanguage(extLang: string): Language {
  switch (extLang) {
    case 'python':
      return 'python'
    case 'typescript':
      return 'typescript'
    case 'javascript':
      return 'javascript'
    default:
      // Fallback: javascript is a safe default for editor highlighting
      return 'javascript'
  }
}

export function buildFileTreeFromPaths(files: IDEInitialFile[] = []): {
  tree: FileSystemNode[]
  pathToId: Map<string, string>
} {
  const root: FileSystemNode[] = []
  const pathToId = new Map<string, string>()

  const ensureFolder = (parentChildren: FileSystemNode[], name: string): FolderNode => {
    // Try to find existing folder first
    const existing = parentChildren.find((n) => n.type === 'folder' && n.name === name) as
      | FolderNode
      | undefined
    if (existing) return existing

    const folder: FolderNode = {
      id: crypto.randomUUID(),
      type: 'folder',
      name,
      children: [],
    }
    parentChildren.push(folder)
    return folder
  }

  for (const f of files) {
    const path = f.path.startsWith('/') ? f.path : `/${f.path}`
    const segments = path.split('/').filter(Boolean) // remove leading ''

    let currentChildren = root
    let currentPath = '/'

    // Handle all folder segments except the last (file)
    for (let i = 0; i < segments.length - 1; i++) {
      const seg = segments[i]
      currentPath = generateFilePath(currentPath, seg)
      const folder = ensureFolder(currentChildren, seg)
      currentChildren = folder.children
      pathToId.set(currentPath, folder.id)
    }

    // Create the file node
    const fileName = segments[segments.length - 1]
    const ext = (fileName.split('.').pop() || '').toLowerCase()
    const lang = getLanguageFromExtension(ext)

    const fileNode: FileNode = {
      id: crypto.randomUUID(),
      type: 'file',
      name: fileName,
      content: f.content ?? '',
      language: lang,
      ...(f.locked ? { locked: true } : {}),
    }
    currentChildren.push(fileNode)
    const filePath = generateFilePath(currentPath, fileName)
    pathToId.set(filePath, fileNode.id)
  }

  return { tree: root, pathToId }
}

export function tabsFromPaths(paths: string[] = [], pathToId: Map<string, string>): IDETab[] {
  const tabs: IDETab[] = []

  for (const p of paths) {
    const path = p.startsWith('/') ? p : `/${p}`
    const fileId = pathToId.get(path)
    if (!fileId) continue

    const fileName = path.split('/').pop() || path
    const ext = (fileName.split('.').pop() || '').toLowerCase()
    const lang = coerceToLanguage(getLanguageFromExtension(ext))

    tabs.push({
      id: crypto.randomUUID(),
      fileId,
      fileName,
      language: lang,
    })
  }

  return tabs
}
