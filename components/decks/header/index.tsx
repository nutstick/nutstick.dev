import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CloseIcon from './close';
import { closeIcon, container, title as titleClassName } from './style.css';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  const router = useRouter();
  return (
    <div className={container}>
      <h3 className={titleClassName}>{title}</h3>
      <div className={closeIcon}>
        <CloseIcon width={36} height={36} onClick={() => router.push('/')} />
      </div>
    </div>
  );
};

export default Header;
