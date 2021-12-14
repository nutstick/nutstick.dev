import React from 'react'
import type { Language } from 'prism-react-renderer'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'

interface Props {
  codeString: string
  language: Language
}

const Code: React.FC<Props> = ({ codeString, language }) => (
  <Highlight
    {...defaultProps}
    code={codeString}
    language={language}
    theme={theme}
  >
    {({ className, tokens, getLineProps, getTokenProps }) => (
      <div className="gatsby-highlight">
        <pre className={className}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      </div>
    )}
  </Highlight>
)

export default Code
