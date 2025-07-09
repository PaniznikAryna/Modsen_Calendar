import React from 'react'
import NavigateImg from '@/assets/images/Navigate.png'
import styles from './styles.module.scss'

const CalendarHeader: React.FC = () => (
  <header className={styles.header}>
    <img src={NavigateImg} alt="Navigate" className={styles.image} />
  </header>
)

export default CalendarHeader
