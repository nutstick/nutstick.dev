import { ImageProps } from 'next/image';

export type GalleryImage = Pick<ImageProps, 'src' | 'alt' | 'blurDataURL'> & {
  id: number;
  create_at: null | string;
};
