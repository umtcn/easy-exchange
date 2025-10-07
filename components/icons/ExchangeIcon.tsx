/**
 * Exchange Icon Component
 * Currency exchange arrows icon
 */

import Image from 'next/image';

interface ExchangeIconProps {
    className?: string;
    size?: number;
}

export const ExchangeIcon = ({
    className = '',
    size = 48
}: ExchangeIconProps) => {
    return (
        <Image
            src="/icons/exchance-icon.svg"
            alt="Currency exchange"
            width={size}
            height={size}
            className={className}
        />
    );
};
