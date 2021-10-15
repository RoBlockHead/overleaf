import { useState } from 'react'
import { useResizeObserver } from '../hooks/use-resize-observer'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'
import Icon from '../../../shared/components/icon'
import PropTypes from 'prop-types'

export default function PdfLogEntryRawContent({
  rawContent,
  collapsedSize = 0,
}) {
  const [expanded, setExpanded] = useState(false)
  const [needsExpander, setNeedsExpander] = useState(false)

  const containerRef = useResizeObserver(entry => {
    setNeedsExpander(entry.target.scrollHeight > collapsedSize)
  })

  const { t } = useTranslation()

  return (
    <div className="log-entry-content-raw-container">
      <div
        className="expand-collapse-container"
        style={{
          height: expanded ? 'auto' : collapsedSize,
        }}
      >
        <pre className="log-entry-content-raw" ref={containerRef}>
          {rawContent.trim()}
        </pre>
      </div>

      {needsExpander && (
        <div
          className={classNames('log-entry-content-button-container', {
            'log-entry-content-button-container-collapsed': !expanded,
          })}
        >
          <Button
            bsSize="xs"
            bsStyle="default"
            className="log-entry-btn-expand-collapse"
            onClick={() => setExpanded(value => !value)}
          >
            {expanded ? (
              <>
                <Icon type="angle-up" /> {t('collapse')}
              </>
            ) : (
              <>
                <Icon type="angle-down" /> {t('expand')}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

PdfLogEntryRawContent.propTypes = {
  rawContent: PropTypes.string.isRequired,
  collapsedSize: PropTypes.number,
}
