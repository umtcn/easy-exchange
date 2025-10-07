/**
 * Amblem Component
 * EasyExchange icon only (without text)
 */

import Image from 'next/image';

interface AmblemProps {
    className?: string;
    size?: number;
}

export const Amblem = ({
    className = '',
    size = 48
}: AmblemProps) => {
    return (
        <Image
            src="/icons/amblem-icon.svg"
            alt="EasyExchange Icon"
            width={size}
            height={size}
            className={className}
        />
    );
};
