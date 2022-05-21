import { atom } from 'recoil';

export const searchingState = atom({
  key: 'Searching',
  default: false,
});

export const queryState = atom({
  key: 'Query',
  default: '',
});
