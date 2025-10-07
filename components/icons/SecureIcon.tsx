/**
 * Secure Icon Component
 * Security shield icon for features section
 */

import Image from 'next/image';

interface SecureIconProps {
    className?: string;
    size?: number;
}

export const SecureIcon = ({
    className = '',
    size = 237
}: SecureIconProps) => {
    return (
        <Image
            src="/icons/secure-icon.svg"
            alt="Secure transactions"
            width={size}
            height={size}
            className={className}
        />
    );
};
