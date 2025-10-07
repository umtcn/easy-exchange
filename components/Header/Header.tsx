/**
 * Header Component
 * Main navigation header with logo and login button
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo, LoginModal } from '@/components';
import styles from './Header.module.scss';

export const Header = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleLoginClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsLoginModalOpen(true);
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    <Link href="/" className={styles.logoLink} aria-label="EasyExchange Home">
                        <Logo className={styles.logo} width={211} height={24} />
                    </Link>

                    <nav className={styles.nav}>
                        <Link href="#" className={styles.loginButton} onClick={handleLoginClick}>
                            LOGIN
                        </Link>
                    </nav>
                </div>
            </header>

            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </>
    );
};
