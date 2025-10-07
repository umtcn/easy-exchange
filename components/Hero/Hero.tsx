/**
 * Hero Section Component
 * Main hero section with title, description, CTA and illustration
 */

import Link from 'next/link';
import { HeroIllustration } from '@/components';
import styles from './Hero.module.scss';

export const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        <span className={styles.titlePrimary}>Exchange Your Money</span>
                        <span className={styles.titleSecondary}>
                            Easily, Quickly And Securely
                        </span>
                    </h1>

                    <p className={styles.description}>
                        Best source for currency conversion, sending money online and tracking
                        exchange rates. Live tracking and notifications + flexible delivery and
                        payment options.
                    </p>

                    <Link href="#" className={styles.ctaButton}>
                        Exchange Fund
                    </Link>
                </div>

                <div className={styles.illustration}>
                    <HeroIllustration />
                </div>
            </div>
        </section>
    );
};
