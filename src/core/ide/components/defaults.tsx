'use client'

import { useIDEStore } from '../store/use-ide-store'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { IDE } from '@/core/ide'

export const DefaultIDEHeader = () => {
  return <></>
}

export const IDEContent = () => {
  const { isExplorerOpen } = useIDEStore((state) => state)

  return <></>
}

export const DefaultIDEFooter = () => {
  return <></>
}
