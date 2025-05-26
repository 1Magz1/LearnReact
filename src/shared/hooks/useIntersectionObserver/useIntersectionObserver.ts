import { RefObject, useEffect } from 'react';

export default function useIntersectionObserver(
  targetRef: RefObject<HTMLElement>,
  callback: () => void,
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  },
) {
  const onIntersected = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();
      }
    });
  };

  useEffect(() => {
    const target = targetRef.current;
    const observer = new IntersectionObserver(onIntersected, options);

    if (target) observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetRef.current]);

  return [];
}
