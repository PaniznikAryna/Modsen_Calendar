import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import AuthHeader from '@/components/AuthHeader';
import FormTitle from '@/components/FormTitle';
import SignUpForm from '@/components/SignUpForm'; 
import {
  CREATE_ACCOUNT,
  ALREADY_HAVE_ACCOUNT,
  SIGN_IN_TEXT,
} from '@/constants/auth';

const SignUpPanel: React.FC = () => (
  <section className={styles.panel}>
<div className={styles.headerWrapper}>
    <AuthHeader />
  </div>
    <FormTitle text={CREATE_ACCOUNT} className={styles.title} />

    <p className={styles.subText}>
      {ALREADY_HAVE_ACCOUNT}{' '}
      <Link to="/signin" className={styles.link}>
        {SIGN_IN_TEXT}
      </Link>
    </p>

    <SignUpForm />  
  </section>
);

export default SignUpPanel;
