import { ComponentProps, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

export interface BlurImageProps {
  className?: string;
  alt: string;
  src: ComponentProps<typeof Image>['src'];
}

function BlurImage({ className, alt, src }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className={clsx(className, 'overflow-hidden bg-gray-200')}>
      <Image
        alt={alt}
        src={src}
        fill={true}
        className={clsx(
          'duration-700 ease-in-out group-hover:opacity-75 object-cover',
          isLoading
            ? 'scale-110 blur-2xl grayscale'
            : 'scale-100 blur-0 grayscale-0'
        )}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
}

export default BlurImage;
