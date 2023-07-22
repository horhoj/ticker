import { FC, Fragment } from 'react';
import styles from './MainPage.module.scss';
import { Ticker } from '~/components/Ticker';
import { IDataItem } from '~/components/Ticker/types';
import { getUUID } from '~/utils/getUUID';

interface MainPageProps {}

const dataList: IDataItem[] = [
  { id: getUUID(), text: 'GOOGLE-Alphabet' },
  { id: getUUID(), text: 'Microsoft' },
  { id: getUUID(), text: 'Oracle' },
];

const dataList2: IDataItem[] = Array(10)
  .fill(null)
  .map(() => ({
    id: getUUID(),
    text: (Math.random() * 10000).toFixed(2).toString(),
  }));

const dataList3: IDataItem[] = [
  {
    id: getUUID(),
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid amet assumenda beatae corporis culpa dolorum earum eos eum ex excepturi explicabo facilis incidunt itaque molestiae nemo nesciunt nobis nostrum odio odit porro quas qui, quis quo quos ratione recusandae saepe sequi suscipit tempore tenetur totam vel voluptate! Rem, suscipit!',
  },
];

const count = Array(10)
  .fill(null)
  .map((_, index) => index);

export const MainPage: FC<MainPageProps> = () => {
  return (
    <div className={styles.wrap}>
      {count.map((index) => (
        <Fragment key={index}>
          <Ticker dataList={dataList} speed={1.2} isRight={true} />
          <Ticker dataList={dataList2} speed={2} isRight={false} />
          <Ticker dataList={dataList3} speed={0.6} isRight={false} />
        </Fragment>
      ))}
    </div>
  );
};
