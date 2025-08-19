import * as IDELayout from './components/layout'
import { RunButton } from './components/run-button'
import { IDEEditor } from './components/editor.client'
import { IDEExplorerTrigger } from './components/explorer/trigger'
import { IDEExplorer } from './components/explorer'
import { IDETabs } from './components/tabs'

export const IDE = {
  Root: IDELayout.IDERoot,
  Header: {
    Root: IDELayout.IDEHeaderRoot,
    LeftPart: IDELayout.IDEHeaderLeftPart,
    RightPart: IDELayout.IDEHeaderRightPart,
  },
  Editor: {
    Root: IDELayout.IDEEditorRoot,
    Content: IDEEditor,
    Tabs: IDETabs,
  },
  Terminal: undefined,
  RunButton: RunButton,
  Explorer: {
    Trigger: IDEExplorerTrigger,
    IDEExplorer: IDEExplorer,
  },
}
