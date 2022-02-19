import React from 'react';
import { preToCodeBlock } from '../../../../utils/preToCodeBlock';
import SyntaxHighlight from '../../syntax-highlight';
import { container, diffAdd, diffRemove } from './style.css';

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>;

const Pre = (props: Props) => {
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
