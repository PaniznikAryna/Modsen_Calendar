import React from 'react'
import navStyles from './CalendarNav.module.scss'

export interface NavProps {
  view: 'Week' | 'Day'
  onViewChange: (v: 'Week' | 'Day') => void
  range: string
  onPrev: () => void
  onNext: () => void
  onToday: () => void
}

const CalendarNav: React.FC<NavProps> = ({
  view,
  onViewChange,
  range,
  onPrev,
  onNext,
  onToday,
}) => (
  <div className={navStyles.nav}>
    <button className={navStyles.todayBtn} onClick={onToday}>
      Today
    </button>

    <div className={navStyles.controls}>
      <button className={navStyles.arrowBtn} onClick={onPrev}>
        {'<'}
      </button>
      <div className={navStyles.range}>{range}</div>
      <button className={navStyles.arrowBtn} onClick={onNext}>
        {'>'}
      </button>
    </div>

    <div className={navStyles.viewToggle}>
      {(['Week', 'Day'] as const).map(v => (
        <button
          key={v}
          className={`${navStyles.toggleBtn} ${
            view === v ? navStyles.active : ''
          }`}
          onClick={() => onViewChange(v)}
        >
          {v}
        </button>
      ))}
    </div>
  </div>
)

export default CalendarNav