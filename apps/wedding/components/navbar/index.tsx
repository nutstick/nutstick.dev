import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import imgLogo from 'public/logo.svg';
import Image from 'next/image';

function Navbar() {
  const { t } = useTranslation('nav');
  return (
    <nav className="absolute z-50 top-0 w-screen px-6 sm:px-8 py-2.5 rounded">
      <div className="container flex flex-wrap items-center justify-center mx-auto">
        <div className="justify-self-center flex flex-wrap items-center justify-center">
          <Link href="/">
            <Image src={imgLogo} alt={t('logo.alt')} className="w-32 h-32" />
          </Link>
        </div>
        {/* <button
          type="button"
          className="inline-flex items-center p-2 ml-3 text-md text-white rounded-lg bg-transparent focus:outline-none ring-2 ring-white px-5 py-1"
        >
          {t('rsvp')}
        </button> */}
      </div>
    </nav>
  );
}

export default Navbar;
