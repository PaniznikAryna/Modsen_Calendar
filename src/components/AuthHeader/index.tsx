import React from 'react';
import styles from './styles.module.scss';
import logo from '@/assets/images/Head.png';

const AuthHeader: React.FC = () => (
  <div className={styles.header}>
    <img src={logo} alt="Modsen Calendar" className={styles.logo} />
  </div>
);

export default AuthHeader;
