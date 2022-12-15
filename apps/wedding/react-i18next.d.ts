import 'react-i18next';
import type nav from './public/locales/en/nav.json';
import type home from './public/locales/en/common.json';
import type invitation from './public/locales/en/invitation.json';

// react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    defaultNS: 'home';
    // custom resources type
    resources: {
      nav: typeof nav;
      home: typeof home;
      invitation: typeof invitation;
    };
  }
}
