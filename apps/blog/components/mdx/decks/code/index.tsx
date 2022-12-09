import React, { useState } from 'react';

const Code = (
  props: React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLElement>,
    HTMLElement
  >
) => {
  const [color] = useState(
    () =>
      [
        'rgb(130, 170, 255)',
        'rgb(255, 203, 139)',
        'rgb(173, 219, 103)',
        'rgb(127, 219, 202)',
      ][Math.floor(Math.random() * 4)]
  );
  return <code style={{ color }} {...props} />;
};

export default Code;
