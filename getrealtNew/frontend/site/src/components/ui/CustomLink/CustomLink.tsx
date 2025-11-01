import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';

interface IProps {
  type?: 'primary' | 'text' | 'text-base';
  href: string;
  text?: string;
  isActive?: boolean;
  isOuter?: boolean;
  isTarget?: boolean;
  ariaLabel?: string;
  svgIcon?: ReactNode;
  onClick?: () => void; // ✅ добавили поддержку onClick
}

const CustomLink: React.FC<IProps> = ({ type = 'primary', href, text, isActive, isOuter = false, isTarget, ariaLabel, svgIcon, onClick }) => {
  const linkClass = clsx(type === 'primary' && 'link-primary', type === 'text' && 'link-text', type === 'text-base' && 'link-text link-text_base', isActive && 'active');

  if (isOuter) {
    return (
      <a href={href} className={linkClass} onClick={onClick} {...(ariaLabel ? { 'aria-label': ariaLabel } : {})} {...(isTarget ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {svgIcon && svgIcon}
        {text && text}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClass} aria-label={ariaLabel} onClick={onClick}>
      {svgIcon && svgIcon}
      {text && text}
    </Link>
  );
};

export default CustomLink;
