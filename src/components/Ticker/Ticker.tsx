import { FC, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Ticker.module.scss';
import { getUUID } from '~/utils/getUUID';
import { IDataItem } from '~/components/Ticker/types';

interface TickerProps {
  dataList: IDataItem[];
  speed: number;
  isRight: boolean;
}

export const Ticker: FC<TickerProps> = (props) => {
  const [rerenderKey, setRerenderKey] = useState(0);

  const dataList = useMemo(
    () => (props.isRight ? [...props.dataList].reverse() : props.dataList),
    [],
  );

  const dataPackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const repeatCountRef = useRef([getUUID()]);
  const enabled = useRef(true);
  const enabledOp = useRef(true);
  const obRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    obRef.current = new IntersectionObserver((data) => {
      enabledOp.current = Boolean(data[0]?.isIntersecting);
    });
    if (wrapRef.current && obRef.current) {
      obRef.current.observe(wrapRef.current);
    }
    return () => {
      if (obRef.current && wrapRef.current) {
        obRef.current.unobserve(wrapRef.current);
      }
    };
  }, []);

  const fn = () => {
    if (enabled.current && enabledOp.current) {
      offset.current = offset.current - props.speed;

      if (dataPackRef.current && wrapRef.current) {
        const dataPackWidth = dataPackRef.current.getBoundingClientRect().width;
        if (Math.abs(offset.current) >= dataPackWidth) {
          offset.current = 0;
          repeatCountRef.current.shift();
        }

        const wrapWidth = wrapRef.current.getBoundingClientRect().width;

        const count = Math.ceil(wrapWidth / dataPackWidth) + 1;
        if (repeatCountRef.current.length < count) {
          repeatCountRef.current = [
            ...repeatCountRef.current,
            ...Array(count - repeatCountRef.current.length)
              .fill('')
              .map(() => getUUID()),
          ];
        }
        setRerenderKey((prevState) => prevState + 1);
      }
    }
    requestAnimationFrame(fn);
  };

  useEffect(() => {
    requestAnimationFrame(fn);
  }, []);

  return (
    <>
      <div
        className={classNames(styles.wrap, props.isRight && styles.isRight)}
        ref={wrapRef}
      >
        <div
          className={styles.internal}
          style={{ transform: `translateX(${offset.current}px)` }}
        >
          {repeatCountRef.current.map((repeatId, index) => {
            const ref = index === 0 ? dataPackRef : undefined;

            return (
              <div className={styles.dataList} key={repeatId} ref={ref}>
                {dataList.map((dataItem) => (
                  <button
                    className={classNames(
                      styles.dataItem,
                      props.isRight && styles.isRight,
                    )}
                    key={dataItem.id}
                    onMouseLeave={() => (enabled.current = true)}
                    onMouseEnter={() => (enabled.current = false)}
                  >
                    {dataItem.text}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
