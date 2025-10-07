/**
 * Fast Icon Component
 * Rocket icon for fast transactions feature
 */

import Image from 'next/image';

interface FastIconProps {
    className?: string;
    size?: number;
}

export const FastIcon = ({
    className = '',
    size = 237
}: FastIconProps) => {
    return (
        <Image
            src="/icons/fast-icon.svg"
            alt="Fast transactions"
            width={size}
            height={size}
            className={className}
        />
    );
};
