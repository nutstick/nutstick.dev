import React from 'react';

export interface HeadingProps {
  children: string;
}

function Heading({ children }: HeadingProps) {
  return (
    <div className="w-[120px] h-[120px] self-center ring-4 ring-primary flex items-center p-1 mt-4 mb-8">
      <h1 className="text-2xl leading-none text-primary uppercase">
        {children.split('\n').map((child, index) => (
          <React.Fragment key={index}>
            {index === 0 ? null : <br />}
            {child}
          </React.Fragment>
        ))}
      </h1>
    </div>
  );
}

export default Heading;
