import React from 'react';
import type { Language } from 'prism-react-renderer';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

interface Props {
  codeString: string;
  language: Language;
}

const Code: React.FC<Props> = ({ codeString, language }) => (
  <Highlight
    {...defaultProps}
    code={codeString}
    language={language}
    theme={theme}
  >
    {({ className, tokens, getLineProps, getTokenProps }) => (
      <pre className={className}>
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

export default Code;
