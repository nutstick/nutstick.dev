import Image, { ImageLoaderProps, ImageProps } from 'next/image';

export function supabaseLoader({ src, width, quality }: ImageLoaderProps) {
  return `https://nxebvjdlaxautnvwsjzo.supabase.co/storage/v1/object/public/${src}?width=${width}&quality=${
    quality || 75
  }`;
}

function RemoteImage(props: Omit<ImageProps, 'loader'> & { bucket: string }) {
  return (
    <Image
      {...props}
      loader={supabaseLoader}
      src={`${props.bucket}/${props.src}`}
      alt={props.alt}
    />
  );
}

export default RemoteImage;
