import * as React from 'react';
import logoDark from '../images/prizma-flow.png';
import logoLight from '../images/prizma-flow-white.png';

interface LogoProps {
  className?: string;
  /** Use "light" on dark backgrounds (white wordmark), "dark" elsewhere. */
  variant?: 'dark' | 'light';
}

const sources: Record<NonNullable<LogoProps['variant']>, string> = {
  dark: logoDark,
  light: logoLight,
};

const Logo: React.FC<LogoProps> = ({ className = '', variant = 'dark' }) => (
  <img
    src={sources[variant]}
    alt="Prizma Flow"
    className={`h-8 w-auto ${className}`}
  />
);

export default Logo;
