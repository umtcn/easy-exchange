/**
 * Features Section Component
 * Three feature cards: Secure, Easy Accessible, Fast and Reliable
 */

import { SecureIcon, AccessibleIcon, FastIcon } from '@/components';
import styles from './Features.module.scss';

const features = [
    {
        id: 'secure',
        icon: SecureIcon,
        title: 'SECURE',
        description:
            'Send money online fast, secure and easy. Live tracking and notifications + flexible delivery and payment options.',
    },
    {
        id: 'accessible',
        icon: AccessibleIcon,
        title: 'EASY ACCESSIBLE',
        description:
            'Create a chart for any currency pair in order to see their currency history. These currency charts use live mid-market rates, are easy to use, and are very reliable.',
    },
    {
        id: 'fast',
        icon: FastIcon,
        title: 'FAST AND RELIABLE',
        description:
            'Need to know when a currency hits a specific rate? The Xe Rate Alerts will let you know when the rate you need is triggered on your selected currency pairs.',
    },
];

export const Features = () => {
    return (
        <section className={styles.features}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {features.map((feature) => (
                        <article key={feature.id} className={styles.card}>
                            <div className={styles.iconWrapper}>
                                <feature.icon size={150} className={styles.icon} />
                            </div>
                            <h3 className={styles.title}>{feature.title}</h3>
                            <p className={styles.description}>{feature.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
