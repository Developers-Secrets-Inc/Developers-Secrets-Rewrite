import * as IDELayout from './components/layout'
import { RunButton } from './components/run-button'
import { IDEEditor } from './components/editor.client'
import { IDEExplorerTrigger } from './components/explorer/trigger'

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
  },
  Terminal: undefined,
  RunButton: RunButton,
  Explorer: {
    Trigger: IDEExplorerTrigger,
  },
}
