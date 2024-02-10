'use client';

import styles from './page.module.scss';
import { LineParseTextarea } from '@/components/LineParseTextarea';

export default function Home() {
  return (
    <main className={styles.main}>
      <section>
        <h2>Cube List</h2>

        <LineParseTextarea onLinesParsed={console.log} />
      </section>

      <section>
        <h2>Removed Cards</h2>

        <LineParseTextarea onLinesParsed={console.log} />
      </section>

      <section>
        <h2>Remaining Cards</h2>
      </section>
    </main>
  );
}
