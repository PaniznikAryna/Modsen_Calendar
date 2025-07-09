// src/pages/SignUpPage/index.tsx
import React from 'react';
import VisitPanel from '@/components/VisitPanelRegister';
import SignUpPanel from '@/components/SignUpPanel';
import styles from './styles.module.scss';

const SignUpPage: React.FC = () => (
  <div className={styles.container}>
    <VisitPanel />
    <SignUpPanel />
  </div>
);
export default SignUpPage;