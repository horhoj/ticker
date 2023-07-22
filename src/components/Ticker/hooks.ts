import { RefObject, useEffect, useRef } from 'react';

export const useIntersectionObserver = (
  ref: RefObject<HTMLElement>,
  load: () => void,
  isShow: boolean,
) => {
  const obRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    obRef.current = new IntersectionObserver((data) => {
      if (data[0]?.isIntersecting === isShow) {
        load();
        if (obRef.current && ref.current !== null) {
          obRef.current.unobserve(ref.current);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (ref.current && obRef.current) {
      obRef.current.observe(ref.current);
    }
  }, []);
};
