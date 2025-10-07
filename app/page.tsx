/**
 * Home Page
 * Main landing page with hero section and features
 */

import { Header, Hero, Features, Converter } from '@/components';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.main}>
        <Hero />
        <Features />
        <Converter />
      </main>
    </div>
  );
}