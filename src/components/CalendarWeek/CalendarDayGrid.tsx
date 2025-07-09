import React, { useState, useEffect, type MouseEvent } from 'react'
import styles from './CalendarGrid.module.scss'
import TimeIcon from '@/assets/icons/time.png'

export interface Event {
  notes: string
  id: string
  title: string
  start: Date
  end: Date
  location?: string
  color: string
}

export interface DayGridProps {
  date: Date
  events: Event[]
  onCellClick: (
    date: Date,
    hour: number,
    coords: { x: number; y: number }
  ) => void
  onEventClick: (ev: Event, coords: { x: number; y: number }) => void
}

const CalendarDayGrid: React.FC<DayGridProps> = ({
  date,
  events,
  onCellClick,
  onEventClick,
}) => {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(t)
  }, [])

  const HEADER = 68
  const ROW = 68
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const frac = now.getHours() + now.getMinutes() / 60
  const topLine = HEADER + frac * ROW - 1

  const handleCellClick = (e: MouseEvent, hour: number) =>
    onCellClick(date, hour, { x: e.clientX, y: e.clientY })
  const handleEventClick = (e: MouseEvent, ev: Event) =>
    onEventClick(ev, { x: e.clientX, y: e.clientY })

  const visible = events.filter(
    ev => ev.start.toDateString() === date.toDateString()
  )

  const getBackground = (rgba: string) => {
    const m = rgba.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\s*\)/)
    return m
      ? `rgba(${m[1]}, ${m[2]}, ${m[3]}, 0.05)`
      : rgba
  }

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.grid} style={{ gridTemplateColumns: '65px 1fr' }}>
        <div className={styles.timeHeader} key="time-header">
          <img src={TimeIcon} alt="Time" />
        </div>

        <div className={styles.dayHeader} key={date.toDateString()}>
          <span className={styles.weekday}>
            {date.toLocaleDateString('en-US', { weekday: 'long' })}
          </span>
          <span className={styles.date}>{date.getDate()}</span>
        </div>

        {hours.map(hour => (
          <React.Fragment key={`row-${hour}`}>
            <div
              className={styles.timeCell}
              onClick={e => handleCellClick(e, hour)}
            >
              {String(hour).padStart(2, '0')}:00
            </div>
            <div
              className={styles.dayCell}
              onClick={e => handleCellClick(e, hour)}
            />
          </React.Fragment>
        ))}

        {visible.map((ev, idx) => {
          const startFrac = ev.start.getHours() + ev.start.getMinutes() / 60
          const duration = (ev.end.getTime() - ev.start.getTime()) / 36e5
          const top = HEADER + startFrac * ROW
          const height = duration * ROW
          const left = 65
          const width = `calc(100% - 65px)`
          const bgColor = getBackground(ev.color)

          return (
            <div
              key={ev.id ?? `evt-${idx}`}
              className={styles.eventBlock}
              style={{
                top,
                left,
                height,
                width,
                background: bgColor,
                border: `2px solid ${ev.color}`,
              }}
              onClick={e => handleEventClick(e, ev)}
            >
              <div className={styles.timeLabels}>
                <div className={styles.timeLabel}>
                  {ev.start.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                {ev.end.getTime() - ev.start.getTime() > 3600e3 && (
                  <div className={styles.timeLabel}>
                    {ev.end.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                )}
              </div>
              <div className={styles.eventTitle}>{ev.title}</div>
            </div>
          )
        })}
      </div>

      <div
        className={styles.currentLine}
        style={{ top: `${topLine}px` }}
        key="current-line"
      />
    </div>
  )
}

export default CalendarDayGrid
