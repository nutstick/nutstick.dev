import { useTranslation } from 'next-i18next';

function Navbar() {
  const { t } = useTranslation('common');
  return (
    <nav className="fixed z-50 top-0 w-screen px-6 sm:px-8 py-2.5 rounded bg-none text-white">
      <div className="container flex flex-wrap justify-end mx-auto">
        <button
          type="button"
          className="inline-flex items-center p-2 ml-3 text-md rounded-lg bg-transparent focus:outline-none ring-2 ring-white px-5 py-1"
        >
          {t('rsvp')}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
