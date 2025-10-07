/**
 * USA Flag Component
 * United States flag icon for currency selector
 */

import Image from 'next/image';

interface USAFlagProps {
    className?: string;
    size?: number;
}

export const USAFlag = ({
    className = '',
    size = 32
}: USAFlagProps) => {
    return (
        <Image
            src="/icons/amerikan_flag.svg"
            alt="USD - United States Dollar"
            width={size}
            height={size}
            className={className}
        />
    );
};
