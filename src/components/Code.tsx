import React from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'

interface Props {
  codeString: string
  language: Language
}

const Code: React.FC<Props> = ({ codeString, language }) => {
  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={undefined}
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
}

export default Code
