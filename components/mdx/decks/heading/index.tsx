import React from 'react';
import { h1, h2, h3, h4, p } from './style.css';

export const H1 = ({
  children,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => (
  <h1 className={h1} {...props}>
    {children}
  </h1>
);

export const H2 = ({
  children,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => (
  <h2 className={h2} {...props}>
    {children}
  </h2>
);

export const H3 = ({
  children,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => (
  <h3 className={h3} {...props}>
    {children}
  </h3>
);

export const H4 = ({
  children,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => (
  <h4 className={h4} {...props}>
    {children}
  </h4>
);

export const P = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >
) => <p className={p} {...props} />;
