import { Button } from 'ariakit/button';
import { motion, useScroll } from 'framer-motion';
import { useWindowSize } from 'hooks/use-window-size';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

const variants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 25 },
};

function Navbar() {
  const { t } = useTranslation('common');
  const size = useWindowSize();

  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useEffect(() => {
    function update() {
      const bannerHeight = (size.current.height ?? 1000) * 0.75 - 200;
      if (
        scrollY?.get() > scrollY?.getPrevious() ||
        scrollY?.get() <= bannerHeight
      ) {
        setShow(false);
      } else if (scrollY?.get() > bannerHeight) {
        setShow(true);
      }
    }

    return scrollY.onChange(() => update());
  }, [scrollY, size]);

  return (
    <motion.nav
      className="fixed bottom-0 z-40 w-screen bg-white px-6 py-2.5 opacity-0 shadow-[0_-1px_6px_-1px_rgba(0,0,0,0.1)] sm:px-8"
      animate={show ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
    >
      <div className="container mx-auto flex flex-wrap justify-end">
        <div className="relative">
          <Button
            type="button"
            className="text-md bg-primary ml-3 inline-flex items-center rounded-lg p-2 px-5 py-1 text-white"
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
              })
            }
          >
            {t('rsvp')}
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
