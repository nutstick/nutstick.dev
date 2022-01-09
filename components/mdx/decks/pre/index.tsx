import React from 'react';
import { preToCodeBlock } from 'mdx-utils';
import SyntaxHighlight from '../../syntax-highlight';

type Props = any;

const Pre: React.FC<Props> = (props) => {
  console.log('pre');
  const preProps = preToCodeBlock(props);
  if (preProps) {
    return <SyntaxHighlight {...preProps} />;
  }
  return <pre {...props} />;
};

export default Pre;
