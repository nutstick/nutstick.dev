import React from 'react';
import cx from 'classnames';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import type { Language } from 'prism-react-renderer';

interface ClassNames {
  container?: string;
  diffAdd?: string;
  diffRemove?: string;
}

interface Props {
  codeString: string;
  language: Language;
  className: `${Language}-css`;
  mdxType: 'code';
  metastring: undefined | string;
  originalType: string;
  parentName: string;
  classNames?: ClassNames;
}

const getDiffInfo = (
  line: {
    types: string[];
    content: string;
    empty?: boolean;
  }[],
  classNames?: ClassNames
): [string, number] | [] => {
  const firstNotEmptyTokenIndex = line.findIndex(({ content }) => content);
  if (firstNotEmptyTokenIndex >= 0) {
    const firstNotEmptyToken = line[firstNotEmptyTokenIndex];
    const isDiffAdd = firstNotEmptyToken.content.startsWith('+');
    const isDiffRemove = firstNotEmptyToken.content.startsWith('-');
    const isDiffNone = !isDiffAdd && !isDiffRemove;
    return [
      cx(
        isDiffAdd && classNames?.diffAdd,
        isDiffRemove && classNames?.diffRemove
      ),
      isDiffAdd || isDiffRemove ? firstNotEmptyTokenIndex + 1 : 0,
    ];
  }
  return [];
};

const SyntaxHighlight: React.FC<Props> = ({
  codeString,
  language,
  metastring,
  classNames,
}) => {
  const diff = !!metastring?.match(/{diff}/);
  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={theme}
    >
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre className={cx(classNames?.container, className)}>
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line, key: i });
            const [diffCx, next] = diff ? getDiffInfo(line, classNames) : [];
            return (
              <div
                key={i}
                {...lineProps}
                className={cx(lineProps.className, diffCx)}
              >
                {line.slice(next).map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default SyntaxHighlight;
