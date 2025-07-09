import React, { useState, useEffect, type MouseEvent } from 'react'
import styles from './CalendarGrid.module.scss'
import TimeIcon from '@/assets/icons/time.png'
import type { Event } from './CalendarDayGrid'

export interface CalendarGridProps {
  weekDates: Date[]
  events: Event[]
  onCellClick: (
    date: Date,
    hour: number,
    coords: { x: number; y: number }
  ) => void
  onEventClick: (
    ev: Event,
    coords: { x: number; y: number }
  ) => void
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  weekDates,
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

  const handleCellClick = (
    e: MouseEvent,
    date: Date,
    hour: number
  ) => onCellClick(date, hour, { x: e.clientX, y: e.clientY })
  const handleEventClick = (e: MouseEvent, ev: Event) =>
    onEventClick(ev, { x: e.clientX, y: e.clientY })

  const visible = events.filter(ev =>
    weekDates.some(d => d.toDateString() === ev.start.toDateString())
  )

  const getBackground = (rgba: string) => {
    const m = rgba.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\s*\)/)
    return m
      ? `rgba(${m[1]}, ${m[2]}, ${m[3]}, 0.05)`
      : rgba
  }

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.grid}>
        <div className={styles.timeHeader} key="time-header">
          <img src={TimeIcon} alt="Time" />
        </div>

        {weekDates.map(d => (
          <div className={styles.dayHeader} key={d.toDateString()}>
            <span className={styles.weekday}>
              {d.toLocaleDateString('en-US', { weekday: 'long' })}
            </span>
            <span className={styles.date}>{d.getDate()}</span>
          </div>
        ))}

        {hours.map(hour => (
          <React.Fragment key={`row-${hour}`}>
            <div
              className={styles.timeCell}
              onClick={e => handleCellClick(e, weekDates[0], hour)}
            >
              {String(hour).padStart(2, '0')}
            </div>
            {weekDates.map(d => (
              <div
                className={styles.dayCell}
                key={`cell-${d.toDateString()}-${hour}`}
                onClick={e => handleCellClick(e, d, hour)}
              />
            ))}
          </React.Fragment>
        ))}

        {visible.map((ev, idx) => {
          const startFrac = ev.start.getHours() + ev.start.getMinutes() / 60
          const duration = (ev.end.getTime() - ev.start.getTime()) / 36e5
          const top = HEADER + startFrac * ROW
          const height = duration * ROW
          const dayIdx = weekDates.findIndex(
            d => d.toDateString() === ev.start.toDateString()
          )
          const left = 65 + dayIdx * 125 + 2
          const width = 118

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
              <div className={styles.eventTitle}>{ev.title}</div>
              <div className={styles.eventDetail}>
                {ev.location && <span>{ev.location}</span>}
                <span>
                  {ev.start.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  –{' '}
                  {ev.end.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
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

export default CalendarGrid
