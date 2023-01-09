import Image, { ImageLoaderProps, ImageProps } from 'next/image';

const cloudinaryLoader = ({ src, width }: ImageLoaderProps) => {
  return `https://res.cloudinary.com/dbzkbe9cr/image/upload/c_fill,w_${width}${src}`;
};

function RemoteImage(props: Omit<ImageProps, 'loader'>) {
  return <Image {...props} loader={cloudinaryLoader} alt={props.alt} />;
}

export default RemoteImage;
