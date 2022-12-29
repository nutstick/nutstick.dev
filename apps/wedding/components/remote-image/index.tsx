import BlurImage from 'components/blur-image';
import type { BlurImageProps } from 'components/blur-image';
import type { ImageLoaderProps } from 'next/image';

export const STORAGE_BASE_URL =
  'https://nxebvjdlaxautnvwsjzo.supabase.co/storage/v1/object/public/images/';

export function supabaseLoader({ src, width, quality }: ImageLoaderProps) {
  return `https://nxebvjdlaxautnvwsjzo.supabase.co/storage/v1/object/public/images/${src}?width=${width}&quality=${
    quality || 75
  }`;
}

function RemoteImage(props: Omit<BlurImageProps, 'loader'>) {
  return <BlurImage {...props} loader={supabaseLoader} alt={props.alt} />;
}

export default RemoteImage;
