import { casts as fallbackCasts, news as fallbackNews, type Cast } from './data';

export async function getManagedData(): Promise<{ casts: Cast[]; news: typeof fallbackNews }> {
  return { casts: fallbackCasts, news: fallbackNews };
}
