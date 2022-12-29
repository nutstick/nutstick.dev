import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import type { ImageProps } from 'next/image';

export interface BlurImageProps extends Omit<ImageProps, 'fill'> {}

function BlurImage({ className, ...props }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className={clsx(className, 'relative overflow-hidden bg-gray-200')}>
      <Image
        {...props}
        alt={props.alt}
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
