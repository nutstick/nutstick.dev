import React from 'react';

export interface HeadingProps {
  children: string;
}

function Heading({ children }: HeadingProps) {
  return (
    <div className="ring-primary mt-4 mb-8 flex h-[120px] w-[120px] items-center self-center p-1 ring-4">
      <h1 className="text-primary text-2xl uppercase leading-none">
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
