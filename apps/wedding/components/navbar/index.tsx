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
      className="fixed z-40 bottom-0 w-screen px-6 sm:px-8 py-2.5 bg-white shadow-[0_-1px_6px_-1px_rgba(0,0,0,0.1)] opacity-0"
      animate={show ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
    >
      <div className="container flex flex-wrap justify-end mx-auto">
        <div className="relative">
          <Button
            type="button"
            className="inline-flex items-center p-2 ml-3 text-md rounded-lg px-5 py-1 text-white bg-primary"
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
