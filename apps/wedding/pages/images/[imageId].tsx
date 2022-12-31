import Head from 'next/head';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import type {
  NextPage,
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsResult,
} from 'next';
import ImageCarousel from 'components/image-carousel/image-carousel';
import Panel from 'components/image-carousel/panel';
import { useImageCarouselState } from 'components/image-carousel/use-image-carousel-state';
import { GalleryImage } from 'interface';
import { createClient } from '@supabase/supabase-js';
import ImageCarouselSlide from 'components/image-carousel/image-carousel-slide';

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

  return (
    <>
      <Head>
        <title>Nut and Freda</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen mx-auto flex max-w-7xl items-center justify-center bg-black/70">
        <ImageCarousel state={carousel}>
          <Panel state={carousel} />
          <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
            <div className="absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
              <button
                className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                onClick={() => router.push('/')}
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
        destination: '/',
      },
    } as GetStaticPropsResult<{ currentImage: GalleryImage }>;
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_KEY || ''
  );
  const { data } = await supabaseAdmin
    .from('images')
    .select('*')
    .eq('id', imageId)
    .single();

  return {
    props: {
      currentImage: data,
    },
  };
};

export async function getStaticPaths() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_KEY || ''
  );
  const { data } = await supabaseAdmin.from('images').select('*');

  if (data == null) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  let fullPaths = [];
  for (let i = 0; i < data.length; i++) {
    fullPaths.push({ params: { imageId: i.toString() } });
  }

  return {
    paths: fullPaths,
    fallback: true,
  };
}
