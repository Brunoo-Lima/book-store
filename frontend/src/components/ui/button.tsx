import { button } from '@/utilities/variants/button';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { VariantProps } from 'tailwind-variants';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    type: 'submit' | 'button' | 'reset';
  };

export default function Button({
  children,
  onClick,
  className,
  type,
  size = 'default',
  color,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={button({ size, color, className })}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
