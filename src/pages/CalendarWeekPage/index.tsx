import React from 'react'
import CalendarHeader from '@/components/CalendarHeader'
import SidebarProfile from '@/components/SidebarProfile'
import CalendarWeek from '@/components/CalendarWeek'
import styles from './styles.module.scss'

const CalendarWeekPage: React.FC = () => (
  <div className={styles.page}>
  <CalendarHeader />

  <div className={styles.content}> 
    <SidebarProfile />
    <CalendarWeek />
  </div>
</div>
)

export default CalendarWeekPage
