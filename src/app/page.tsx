'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './page.module.scss';
import { LineParseTextarea } from '@/components/LineParseTextarea';
import { Icon } from '@iconify/react';
import { CopiedToast } from '@/components/CopiedToast';

export default function Home() {
  const [cubeList, setCubeList] = useState<string[]>([]);
  const [removedCards, setRemovedCards] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);

  const remainingCards = useMemo(() => {
    const cubeSet = new Set(cubeList);
    removedCards.forEach((card) => cubeSet.delete(card));
    return Array.from(cubeSet);
  }, [cubeList, removedCards]);

  return (
    <main className={styles.main}>
      <section>
        <section className={styles.header}>
          <h2>Cube List</h2>

          <p className={styles.count}>{cubeList.length} cards</p>
        </section>

        <LineParseTextarea onLinesParsed={setCubeList} />
      </section>

      <section>
        <section className={styles.header}>
          <h2>Removed Cards</h2>

          <p className={styles.count}>{removedCards.length} cards</p>
        </section>

        <LineParseTextarea onLinesParsed={setRemovedCards} />
      </section>

      <section>
        <section className={styles.header}>
          <h2>Remaining Cards</h2>

          <Icon
            icon='material-symbols:content-copy-outline'
            onClick={() => {
              navigator.clipboard.writeText(remainingCards.join('\n'));
              setShowToast(true);
            }}
            width={30}
          />

          <p className={styles.count}>{remainingCards.length} cards</p>
        </section>

        <section className={styles.remaining}>
          {remainingCards.map((card) => (
            <div key={card}>{card}</div>
          ))}
        </section>
      </section>

      <CopiedToast hide={() => setShowToast(false)} show={showToast} />
    </main>
  );
}
