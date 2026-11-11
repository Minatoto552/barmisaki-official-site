'use client';
import { useEffect, useState } from 'react';
import { fetchSiteData, loadSiteData, type SiteData } from './site-data';

export type SiteDataState = { data: SiteData | null; status: 'loading' | 'ready' | 'error' };

// Loads the shared content once in the browser and refreshes it when the tab becomes visible again.
export function useSiteData(): SiteDataState {
  const [state, setState] = useState<SiteDataState>({ data: null, status: 'loading' });
  useEffect(() => {
    let active = true;
    const load = (first = false) => {
      (first ? loadSiteData() : fetchSiteData())
        .then((data) => { if (active) setState({ data, status: 'ready' }); })
        .catch(() => { if (active) setState((current) => (current.data ? current : { data: null, status: 'error' })); });
    };
    load(true);
    const onVisible = () => { if (!document.hidden) load(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => { active = false; document.removeEventListener('visibilitychange', onVisible); };
  }, []);
  return state;
}
