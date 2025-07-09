import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { LOGIN_IN } from '@/constants/auth';

const SignInForm: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Неверный формат email';
      }
    }
    if (name === 'password') {
      if (value.trim().length < 6) {
        error = 'Минимум 6 символов';
      }
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const isFormValid =
    form.email.trim() &&
    form.password.trim() &&
    Object.values(errors).every(err => !err);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    navigate('/calendar/week');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
      />

      <Button variant="auth" type="submit" disabled={!isFormValid}>
        {LOGIN_IN}
      </Button>
    </form>
  );
};

export default SignInForm;
