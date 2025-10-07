/**
 * Accessible Icon Component
 * Mobile accessibility icon for features section
 */

import Image from 'next/image';

interface AccessibleIconProps {
    className?: string;
    size?: number;
}

export const AccessibleIcon = ({
    className = '',
    size = 237
}: AccessibleIconProps) => {
    return (
        <Image
            src="/icons/accessible-icon.svg"
            alt="Easy access"
            width={size}
            height={size}
            className={className}
        />
    );
};
