import React, { useState } from 'react'
import type { InputProps } from './types'
import styles from './styles.module.scss'
import hiddenEye from '@/assets/icons/hidden_eye.png'
import openEye from '@/assets/icons/open_eye.png'

const Input: React.FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  className,
}) => {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'

  const toggleShow = () => {
    if (isPassword) setShow(prev => !prev)
  }

  const inputClass = [
    styles.input,
    error ? styles['input--error'] : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={styles.inputBlock}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>

      <div className={styles.inputWrapper}>
        <input
          id={name}
          name={name}
          type={isPassword ? (show ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClass}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.eyeBtn}
            onClick={toggleShow}
          >
            <img
              src={show ? openEye : hiddenEye}
              alt={show ? 'Hide password' : 'Show password'}
              className={styles.eyeIcon}
            />
          </button>
        )}
      </div>

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  )
}

export default Input
