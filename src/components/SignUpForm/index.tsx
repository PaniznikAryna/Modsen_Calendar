import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { REGISTER_BUTTON_TEXT } from '@/constants/auth'
import inputStyles from '@/components/Input/styles.module.scss'

const SignUpForm: React.FC = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  const validateField = (name: string, val: string) => {
    let error = ''
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!val.trim()) error = 'Поле обязательно'
        break
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
          error = 'Неверный формат email'
        break
      case 'password':
        if (val.length < 6) error = 'Минимум 6 символов'
        break
      case 'confirmPassword':
        if (val !== form.password) error = 'Пароли не совпадают'
        break
    }
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    validateField(name, value)

    if (name === 'password' && form.confirmPassword) {
      validateField('confirmPassword', form.confirmPassword)
    }
  }

  const isFormValid =
    Object.values(errors).every(err => !err) &&
    Object.values(form).every(v => v.trim() !== '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    navigate('/calendar/week')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="First Name"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        className={inputStyles.input}
        error={errors.firstName}
      />
      <Input
        label="Last Name"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        className={inputStyles.input}
        error={errors.lastName}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        className={inputStyles.input}
        error={errors.email}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        className={inputStyles.input}
        error={errors.password}
      />
      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={handleChange}
        className={inputStyles.input}
        error={errors.confirmPassword}
      />

      <Button variant="auth" type="submit" disabled={!isFormValid}>
        {REGISTER_BUTTON_TEXT}
      </Button>
    </form>
  )
}

export default SignUpForm
