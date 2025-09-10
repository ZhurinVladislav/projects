import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';

interface IProps {
  type?: 'primary' | 'text';
  href: string;
  text?: string;
  isActive?: boolean;
  isOuter?: boolean;
  isTarget?: boolean;
  ariaLabel?: string;
  svgIcon?: ReactNode;
}

const CustomLink: React.FC<IProps> = props => {
  const { type = 'primary', isOuter = false, href, isTarget, svgIcon, isActive, text, ariaLabel } = props;

  const linkClass = clsx(type === 'primary' && 'link-primary', type === 'text' && 'link-text', isActive && 'active');

  if (!isOuter) {
    return (
      <Link className={linkClass} href={href} aria-label={ariaLabel}>
        {svgIcon && <>{svgIcon}</>}
        {text && <>{text}</>}
      </Link>
    );
  } else {
    return (
      <a className={linkClass} href={href} {...(ariaLabel ? { 'aria-label': ariaLabel } : {})} {...(isTarget ? { target: '_blank' } : {})}>
        {svgIcon && <>{svgIcon}</>}
        {text && <>{text}</>}
      </a>
    );
  }
};

export default CustomLink;
