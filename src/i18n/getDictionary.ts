import 'server-only';
import type { Locale } from './config';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  bn: () => import('./dictionaries/bn.json').then((module) => module.default),
  ar: () => import('./dictionaries/ar.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  const loader = dictionaries[locale] || dictionaries.en;
  return loader();
};
