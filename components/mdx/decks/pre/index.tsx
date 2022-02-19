import React from 'react';
import { preToCodeBlock } from '../../../../utils/preToCodeBlock';
import SyntaxHighlight from '../../syntax-highlight';

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>;

const Pre = (props: Props) => {
  const preProps = preToCodeBlock(props);
  if (preProps) {
    return <SyntaxHighlight {...preProps} />;
  }
  return <pre {...props} />;
};

export default Pre;
