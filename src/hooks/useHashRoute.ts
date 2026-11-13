import { useEffect, useState } from 'react';

export function useHashRoute(): [string, (h: string) => void] {
  const [route, setRoute] = useState(() => window.location.hash.replace(/^#\/?/, '') || 'inicio');
  useEffect(() => {
    const onChange = () => {
      setRoute(window.location.hash.replace(/^#\/?/, '') || 'inicio');
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  const navigate = (h: string) => {
    window.location.hash = `#/${h}`;
  };
  return [route, navigate];
}

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, window.scrollY / total) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}
