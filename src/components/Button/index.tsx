import React from 'react';
import type { ButtonProps } from './types';
import styles from './styles.module.scss';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'auth',
  disabled = false,
  onClick,
  type = 'button',
}) => {
  const cn = [
    styles.button,
    styles[`button--${variant}`],
    disabled ? styles['button--error'] : ''
  ].filter(Boolean).join(' ');

  return (
    <button
      className={cn}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
