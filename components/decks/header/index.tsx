/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Close from '../../../img/close.svg';
import { closeIcon, container, title as titleClassName } from './style.css';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  const router = useRouter();
  return (
    <div className={container}>
      <h3 className={titleClassName}>{title}</h3>
      <Image
        className={closeIcon}
        src={Close}
        alt="Close"
        onClick={() => router.push('/')}
      />
    </div>
  );
};

export default Header;
