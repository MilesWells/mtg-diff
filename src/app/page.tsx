'use client';

import { SimpleGrid } from '@mantine/core';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <SimpleGrid cols={3}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </SimpleGrid>
    </main>
  );
}
