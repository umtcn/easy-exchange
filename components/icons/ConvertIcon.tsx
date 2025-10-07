/**
 * Convert Icon Component
 * Currency conversion icon (coin exchange)
 */

import Image from 'next/image';

interface ConvertIconProps {
    className?: string;
    size?: number;
}

export const ConvertIcon = ({
    className = '',
    size = 48
}: ConvertIconProps) => {
    return (
        <Image
            src="/icons/convert_icon.svg"
            alt="Convert currency"
            width={size}
            height={size}
            className={className}
        />
    );
};
