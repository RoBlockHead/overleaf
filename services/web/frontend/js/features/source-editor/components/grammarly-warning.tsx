import { useCallback, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import customLocalStorage from '../../../infrastructure/local-storage'
import useScopeValue from '../../../shared/hooks/use-scope-value'
import grammarlyExtensionPresent from '../../../shared/utils/grammarly'
import getMeta from '../../../utils/meta'

export default function GrammarlyWarning() {
  const [show, setShow] = useState(false)
  const [newSourceEditor] = useScopeValue('editor.newSourceEditor')
  const [showRichText] = useScopeValue('editor.showRichText')
  const grammarly = grammarlyExtensionPresent()
  const hasDismissedGrammarlyWarning = customLocalStorage.getItem(
    'editor.has_dismissed_grammarly_warning'
  )

  useEffect(() => {
    const showGrammarlyWarning =
      !hasDismissedGrammarlyWarning &&
      grammarly &&
      newSourceEditor &&
      !showRichText

    if (showGrammarlyWarning) {
      setShow(true)
    }
  }, [grammarly, hasDismissedGrammarlyWarning, newSourceEditor, showRichText])

  const handleClose = useCallback(() => {
    setShow(false)
    customLocalStorage.setItem('editor.has_dismissed_grammarly_warning', true)
  }, [])

  if (!getMeta('ol-showNewSourceEditorOption')) {
    return null
  }

  if (!show) {
    return null
  }

  return (
    <div className="alert alert-info grammarly-warning" role="alert">
      <Button
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={handleClose}
      >
        <span aria-hidden="true">&times;</span>
      </Button>
      <div className="warning-content">
        A browser extension, for example Grammarly, may be slowing down
        Overleaf.{' '}
        <a
          className="warning-link"
          href="/learn/how-to/Use_Grammarly_with_Overleaf#Performance_issues"
          target="_blank"
        >
          Find out how to avoid this
        </a>
      </div>
    </div>
  )
}
