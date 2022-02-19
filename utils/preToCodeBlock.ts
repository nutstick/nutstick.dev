import type { Language } from 'prism-react-renderer';

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>;

const isHTMLCodeElement = (
  element: React.ReactNode
): element is React.ReactElement<JSX.IntrinsicElements['code'], 'code'> => {
  // @ts-expect-error cast type
  return element.props && element.type;
};

export const preToCodeBlock = (preProps: Props) => {
  const child = preProps.children;
  if (isHTMLCodeElement(child)) {
    const { children: codeString, className = '', ...props } = child.props;

    const match = className.match(/language-([\0-\uFFFF]*)/);

    return match != null && typeof codeString === 'string'
      ? {
          codeString: codeString.trim(),
          className,
          language: match[1] as Language,
          // @ts-expect-error custom properties
          meta: props.meta,
        }
      : null;
  }
};
