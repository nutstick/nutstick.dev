import React from 'react';
import cx from 'classnames';
import Highlight, { defaultProps } from 'prism-react-renderer';
import themeLight from 'prism-react-renderer/themes/nightOwlLight';
import themeDark from 'prism-react-renderer/themes/nightOwl';
import { useTheme } from '../../../hooks/use-theme';
import type { Language } from 'prism-react-renderer';

interface ClassNames {
  container?: string;
  diffAdd?: string;
  diffRemove?: string;
  highlight?: string;
}

interface Props {
  codeString: string;
  language: Language;
  className: string;
  meta: undefined | string;
  classNames?: ClassNames;
}

type Token = {
  types: string[];
  content: string;
  empty?: boolean;
};

const getDiffInfo = (
  line: Token[],
  classNames?: ClassNames
): [string, number] | [] => {
  const firstNotEmptyTokenIndex = line.findIndex(({ content }) => content);
  if (firstNotEmptyTokenIndex >= 0) {
    const firstNotEmptyToken = line[firstNotEmptyTokenIndex];
    const isDiffAdd = firstNotEmptyToken.content.startsWith('+');
    const isDiffRemove = firstNotEmptyToken.content.startsWith('-');
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

const isHighlightedLine = (line?: Token[]) =>
  line?.some((prevLine) => {
    return ['/* highlight-next-line */', '// highlight-next-line'].includes(
      prevLine?.content
    );
  });

const SyntaxHighlight: React.FC<Props> = ({
  codeString,
  language,
  meta,
  classNames,
}) => {
  const { mode } = useTheme();
  const diff = !!meta?.match(/{diff}/);
  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={mode === 'dark' ? themeDark : themeLight}
    >
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre className={cx(classNames?.container, className)}>
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line, key: i });
            const [diffCx, next] = diff ? getDiffInfo(line, classNames) : [];

            if (isHighlightedLine(line)) {
              return null;
            }

            return (
              <div
                key={i}
                {...lineProps}
                className={cx(
                  lineProps.className,
                  diffCx,
                  isHighlightedLine(tokens?.[i - 1]) && classNames?.highlight
                )}
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
