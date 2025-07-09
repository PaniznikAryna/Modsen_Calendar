import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import AuthHeader from '@/components/AuthHeader';
import FormTitle from '@/components/FormTitle';
import SignInForm from '@/components/SignInForm';
import {
  LOGIN_IN,
  DO_NOT_HAVE_ACCOUNT,
  SUBMIT_TEXT,
} from '@/constants/auth';

const SignInPanel: React.FC = () => (
  <section className={styles.panel}>
    <AuthHeader />

<FormTitle text={LOGIN_IN} className={styles.title} />

    <p className={styles.subText}>
      {DO_NOT_HAVE_ACCOUNT}{' '}
      <Link to="/signup" className={styles.link}>
        {SUBMIT_TEXT}
      </Link>
    </p>

    <SignInForm />
  </section>
);

export default SignInPanel;
