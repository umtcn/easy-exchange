/**
 * EUR Flag Component
 * European Union flag icon for currency selector
 */

import Image from 'next/image';

interface EURFlagProps {
    className?: string;
    size?: number;
}

export const EURFlag = ({
    className = '',
    size = 32
}: EURFlagProps) => {
    return (
        <Image
            src="/icons/eur-flag.svg"
            alt="EUR - Euro"
            width={size}
            height={size}
            className={className}
        />
    );
};
