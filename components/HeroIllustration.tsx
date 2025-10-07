/**
 * Hero Illustration Component
 * Wallet illustration for hero section
 */

import Image from 'next/image';

interface HeroIllustrationProps {
    className?: string;
}

export const HeroIllustration = ({ className = '' }: HeroIllustrationProps) => {
    return (
        <div className={`hero-illustration ${className}`}>
            <Image
                src="/images/hero-wallet.png"
                alt="Digital wallet with currency exchange"
                width={472}
                height={586}
                priority
                quality={90}
                sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 472px"
                style={{ width: '100%', height: 'auto' }}
            />
        </div>
    );
};
