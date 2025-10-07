/**
 * LoginModal Component
 * Modal dialog for user login
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components';
import styles from './LoginModal.module.scss';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 500);
    };

    // Close modal on ESC key press
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen && !isClosing) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Login logic will be implemented here
        console.log('Login submitted');
    };

    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div
                className={`${styles.modal} ${isClosing ? styles.closing : ''}`}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                {/* Logo */}
                <div className={styles.logoContainer}>
                    <Logo className={styles.logo} />
                </div>

                {/* Green Line */}
                <div className={styles.divider} />

                {/* Title */}
                <h2 id="modal-title" className={styles.title}>
                    Login Account
                </h2>

                {/* Login Form */}
                <form className={styles.form} onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email ID
                        </label>
                        <input
                            id="email"
                            type="email"
                            className={styles.input}
                            placeholder="Email ID"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className={styles.input}
                            placeholder="Password"
                            required
                        />
                    </div>

                    {/* Links */}
                    <div className={styles.links}>
                        <Link href="#" className={styles.link}>
                            I don't have account
                        </Link>
                        <Link href="#" className={styles.link}>
                            Forgot your password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className={styles.submitButton}>
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
    );
};
