import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import ImageCarousel from 'components/image-carousel/image-carousel';
import ImageCarouselSlide from 'components/image-carousel/image-carousel-slide';
import Panel from 'components/image-carousel/panel';
import { useImageCarouselState } from 'components/image-carousel/use-image-carousel-state';
import { GalleryImage } from 'interface';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { data } from '../../data';

const Image: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  currentImage,
}: {
  currentImage: GalleryImage;
}) => {
  const router = useRouter();
  const imageId =
    typeof router.query.imageId === 'string' ? router.query.imageId : undefined;

  const carousel = useImageCarouselState({
    activeId: imageId,
  });

  if (currentImage == null) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Nut and Freda</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-screen justify-center bg-black/70">
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-center">
          <ImageCarousel state={carousel}>
            <Panel state={carousel} />
            <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
              <div className="absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
                <button
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                  onClick={() =>
                    router.push(`/`, undefined, {
                      shallow: true,
                      scroll: false,
                    })
                  }
                >
                  <ArrowUturnLeftIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="hidden">
                <ImageCarouselSlide
                  state={carousel}
                  index={0}
                  image={currentImage}
                />
              </div>
            </div>
          </ImageCarousel>
        </div>
      </main>
    </>
  );
};

export default Image;

export const getStaticProps: GetStaticProps<{
  currentImage: GalleryImage;
}> = async (context) => {
  const imageId = Number(context.params?.imageId);

  if (Number.isNaN(imageId)) {
    return {
      redirect: {
        statusCode: 303,
        destination: '/',
      },
    };
  }

  const image = data.find((image) => image.id === imageId);

  if (image == null) {
    return {
      redirect: {
        statusCode: 303,
        destination: '/',
      },
    };
  }

  return {
    props: {
      currentImage: image,
    },
  };
};

export async function getStaticPaths() {
  const fullPaths = data.map(({ id }) => ({ params: { imageId: String(id) } }));

  return {
    paths: fullPaths,
    fallback: true,
  };
}
