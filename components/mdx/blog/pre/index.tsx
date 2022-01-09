import React from 'react';
import { preToCodeBlock } from 'mdx-utils';
import SyntaxHighlight from '../../syntax-highlight';
import { container, diffAdd, diffRemove } from './style.css';

type Props = any;

const Pre: React.FC<Props> = (props) => {
  const preProps = preToCodeBlock(props);
  if (preProps) {
    return (
      <SyntaxHighlight
        {...preProps}
        classNames={{
          container,
          diffAdd,
          diffRemove,
        }}
      />
    );
  }
  return <pre {...props} />;
};

export default Pre;
