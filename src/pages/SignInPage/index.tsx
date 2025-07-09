import React from 'react';
import VisitPanel from '@/components/VisitPanelLogin';
import SignInPanel from '@/components/SignInPanel';
import styles from './styles.module.scss';

const SignInPage: React.FC = () => (
<div className={styles.container}>
  <VisitPanel />    
  <SignInPanel />  
</div>

);

export default SignInPage;
