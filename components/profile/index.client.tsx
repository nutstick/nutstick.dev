import React from 'react';
import Image from 'next/image';
import { avatar, container, name } from './style.css';

const Profile: React.FC = () => {
  return (
    <div className={container}>
      <Image
        className={avatar}
        src="https://avatars.githubusercontent.com/u/11162782?v=4"
        alt="Nuttapat Kirawittya"
        priority={true}
        width={212}
        height={212}
      />
      <h2 className={name}>Nuttapat Kirawittaya</h2>
      <div>Senior Frontend Engineer, Shopee SG</div>
    </div>
  );
};

export default Profile;
