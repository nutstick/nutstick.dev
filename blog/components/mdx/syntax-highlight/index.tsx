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
}

interface Props {
  codeString: string;
  language: Language;
  className: string;
  meta: undefined | string;
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
