import React from 'react';
import styles from './styles.module.scss';

interface FormTitleProps {
  text: string;
  className?: string;
}

const FormTitle: React.FC<FormTitleProps> = ({ text, className }) => (
  <h2 className={`${styles.title} ${className || ''}`.trim()}>
    {text}
  </h2>
);

export default FormTitle;
