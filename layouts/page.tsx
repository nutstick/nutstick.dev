import React from 'react';
import Container from '../components/container';
import Header from './header';
import LayoutMain from './main';

const Page: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <LayoutMain>
        <Container>{children}</Container>
      </LayoutMain>
    </>
  );
};

export default Page;
