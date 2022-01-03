import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiMailDotRu } from '@react-icons/all-files/si/SiMailDotRu';
import { SiGithub } from '@react-icons/all-files/si/SiGithub';
import { SiLinkedin } from '@react-icons/all-files/si/SiLinkedin';
import { SiTwitter } from '@react-icons/all-files/si/SiTwitter';
import { header, container, homeLogo, rightMenu } from './style.css';
import Container from '../../components/container';
import ThemeSwitch from '../../components/theme-switch';
import { useTheme } from '../../hooks/use-theme';

const author = {
  name: 'Nuttapat Kirawittaya',
  avatar: 'https://avatars.githubusercontent.com/u/11162782?v=4',
  bio: 'Senior Frontend Engineer, Shopee SG',
  url: 'https://nutstick.dev',
  github: 'https://github.com/nutstick',
  linkedin: 'https://www.linkedin.com/in/nuttapat-kirawittaya',
  email: 'nuttapat.kirawittaya@gmail.com',
  twitter: undefined,
};

const Header: React.FC = () => {
  const { mode } = useTheme();
  const color = mode === 'dark' ? '#fff' : 'rgba(27, 32, 62, 0.87)';
  const { github, twitter, linkedin, email } = author || {};
  return (
    <header className={header}>
      <Container className={container}>
        <Link href="/">
          <a>
            <Image
              className={homeLogo}
              src="/logo.svg"
              alt="nutstick.dev"
              width="175"
              height="34"
            />
          </a>
        </Link>
        <div className={rightMenu}>
          {email && (
            <a href={`mailto: ${email}`} rel="noreferrer" target="_blank">
              <SiMailDotRu color={color} size={28} />
            </a>
          )}
          {github && (
            <a href={github}>
              <SiGithub color={color} size={28} />
            </a>
          )}
          {twitter && (
            <a href={twitter}>
              <SiTwitter color={color} size={28} />
            </a>
          )}
          {linkedin && (
            <a href={linkedin}>
              <SiLinkedin color={color} size={28} />
            </a>
          )}
          <ThemeSwitch />
        </div>
      </Container>
    </header>
  );
};

export default Header;
