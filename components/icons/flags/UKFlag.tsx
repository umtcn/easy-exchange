/**
 * UK Flag Component
 * United Kingdom flag icon for currency selector
 */

import Image from 'next/image';

interface UKFlagProps {
    className?: string;
    size?: number;
}

export const UKFlag = ({
    className = '',
    size = 32
}: UKFlagProps) => {
    return (
        <Image
            src="/icons/uk-flag-icon.svg"
            alt="GBP - British Pound"
            width={size}
            height={size}
            className={className}
        />
    );
};
