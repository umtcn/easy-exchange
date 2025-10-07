/**
 * Logo Component
 * Full EasyExchange logo with text
 */

import Image from 'next/image';

interface LogoProps {
    className?: string;
    width?: number;
    height?: number;
}

export const Logo = ({
    className = '',
    width = 422,
    height = 48
}: LogoProps) => {
    return (
        <Image
            src="/logo/logo-full.svg"
            alt="EasyExchange Logo"
            width={width}
            height={height}
            className={className}
            priority
        />
    );
};
