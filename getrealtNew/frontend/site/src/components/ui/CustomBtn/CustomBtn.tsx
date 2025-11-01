import clsx from 'clsx';
import { ReactNode } from 'react';

interface IProps {
  type?: 'primary' | 'text';
  text?: string;
  isActive?: boolean;
  ariaLabel?: string;
  svgIcon?: ReactNode;
  customClasses?: string;
}

const CustomBtn: React.FC<IProps> = props => {
  const { type = 'primary', customClasses, svgIcon, isActive, text, ariaLabel } = props;

  const linkClass = clsx(type === 'primary' && 'btn-primary', type === 'text' && 'btn-text', isActive && 'active', customClasses && customClasses);

  return (
    <button className={linkClass} {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}>
      {svgIcon && <>{svgIcon}</>}
      {text && <>{text}</>}
    </button>
  );

  // if (!isOuter) {
  //   return (
  //     <Link className={linkClass} href={href} aria-label={ariaLabel}>
  //       {svgIcon && <>{svgIcon}</>}
  //       {text && <>{text}</>}
  //     </Link>
  //   );
  // } else {
  //   return (
  //     <a className={linkClass} href={href} aria-label={ariaLabel}>
  //       {svgIcon && <>{svgIcon}</>}
  //       {text && <>{text}</>}
  //     </a>
  //   );
  // }
};

export default CustomBtn;
