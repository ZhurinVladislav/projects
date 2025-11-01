'use client';

import clsx from 'clsx';
import Link, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

type Variant = 'primary' | 'secondary' | 'success';

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

// 🔧 Расширяем типизацию так, чтобы Link тоже поддерживал произвольные атрибуты
type ButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = BaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;
type CustomLinkProps = BaseProps & NextLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type Props = ButtonProps | AnchorProps | CustomLinkProps;

const ButtonLink: React.FC<Props> = props => {
  const { variant = 'primary', className, children, ...rest } = props;

  const baseStyles = 'flex max-h-max min-h-12 min-w-11 items-center justify-center font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 px-5 py-2 rounded-sm';
  const variants: Record<Variant, string> = {
    primary: 'bg-(--secondary-color) px-2 text-center text-white transition-colors duration-300 ease-linear hover:bg-(--primary-color) focus:ring-(--secondary-color)',
    secondary:
      'border border-(--secondary-color) bg-(--bg-op-1-color) px-2 text-center text-white transition-colors duration-300 ease-linear hover:bg-(--primary-color) focus:ring-(--secondary-color)',
    success:
      'border border-(--success-color) bg-(--success-color) px-2 text-center text-white transition-colors duration-300 ease-linear hover:bg-transparent hover:text-(--success-color) focus:ring-(--success-color)',
  };

  const combined = clsx(baseStyles, variants[variant], className);

  // 🧭 Если есть href — решаем, что рендерить
  if ('href' in props && props.href) {
    const isExternal = props.href.startsWith('http');

    if (isExternal) {
      // 🌍 Внешняя ссылка → <a>
      const anchorProps = rest as AnchorProps;
      return (
        <a {...anchorProps} href={props.href} className={combined} target={anchorProps.target ?? '_blank'} rel={anchorProps.rel ?? 'noopener noreferrer'}>
          {children}
        </a>
      );
    }

    // 🧩 Внутренний маршрут → <Link>
    const linkProps = rest as CustomLinkProps;
    return (
      <Link {...linkProps} href={props.href} className={combined}>
        {children}
      </Link>
    );
  }

  // 🧱 Обычная кнопка
  const buttonProps = rest as ButtonProps;
  return (
    <button type={buttonProps.type ?? 'button'} {...buttonProps} className={combined}>
      {children}
    </button>
  );
};

ButtonLink.displayName = 'ButtonLink';
export default ButtonLink;
