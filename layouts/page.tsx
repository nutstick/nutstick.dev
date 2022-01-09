import React from 'react';
import Container from '../components/container';
import Header from './header';
import LayoutMain from './main';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  className: string;
}

const Page: React.FC<Props> = ({ children, ...props }) => {
  return (
    <>
      <Header />
      <LayoutMain>
        <Container {...props}>{children}</Container>
      </LayoutMain>
    </>
  );
};

export default Page;
