export type ButtonVariant = 'auth' | 'primary' | 'danger' | 'outlined';
export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

