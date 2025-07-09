// src/components/AddEventModal/AddEventModal.tsx
import React, { useState, useEffect, useRef, type MouseEvent } from 'react'
import styles from './AddEventModal.module.scss'
import PlaceIcon from '@/assets/icons/place.png'
import DateIcon from '@/assets/icons/data.png'
import TimeIcon2 from '@/assets/icons/time2.png'
import PenIcon from '@/assets/icons/pen.png'

export interface NewEvent {
  id?: string
  title: string
  location: string
  date: Date
  start: number
  end: number
  notes: string
  color: string
}

interface Props {
  initialData: NewEvent
  coords: { x: number; y: number }
  mode: 'create' | 'edit'
  onSave: (ev: NewEvent) => void
  onDelete?: (id: string) => void
  onCancel: () => void
}

const COLORS = [
  'rgba(204, 116, 41, 1)',
  'rgba(255, 203, 51, 1)',
  'rgba(255, 102, 51, 1)',
  'rgba(41, 204, 57, 1)',
  'rgba(46, 230, 202, 1)',
  'rgba(51, 191, 255, 1)',
  'rgba(230, 46, 123, 1)',
  'rgba(136, 51, 255, 1)',
]

const AddEventModal: React.FC<Props> = ({
  initialData,
  coords,
  mode,
  onSave,
  onDelete,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialData.title)
  const [location, setLocation] = useState(initialData.location)
  const [date, setDate] = useState(
    initialData.date.toISOString().slice(0, 10)
  )
  const [startTime, setStartTime] = useState(
    `${initialData.start.toString().padStart(2, '0')}:00`
  )
  const [endTime, setEndTime] = useState(
    `${initialData.end.toString().padStart(2, '0')}:00`
  )
  const [notes, setNotes] = useState(initialData.notes)
  const [color, setColor] = useState(initialData.color)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const dateRef = useRef<HTMLInputElement>(null)
  const startRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setTitle(initialData.title)
    setLocation(initialData.location)
    setDate(initialData.date.toISOString().slice(0, 10))
    setStartTime(`${initialData.start.toString().padStart(2, '0')}:00`)
    setEndTime(`${initialData.end.toString().padStart(2, '0')}:00`)
    setNotes(initialData.notes)
    setColor(initialData.color)
  }, [initialData])

  const errors: string[] = []
  if (!title.trim()) errors.push('Требуется название')
  else if (title.length > 20) errors.push('Не более 20 символов')

  if (location.length > 20) errors.push('Не более 20 символов')

  const dateDisplay = date.split('-').reverse().join('.')
  if (!/^\d{2}\.\d{2}\.\d{4}$/.test(dateDisplay))
    errors.push('Date format DD.MM.YYYY')

  if (!/^\d{2}:\d{2}$/.test(startTime) || !/^\d{2}:\d{2}$/.test(endTime))
    errors.push('Time format HH:MM – HH:MM')
  else if (startTime >= endTime)
    errors.push('Start must be before End')

  const canSave = errors.length === 0

  const toggleDropdown = (e: MouseEvent) => {
    e.stopPropagation()
    setDropdownOpen(o => !o)
  }

  const handleSaveClick = () => {
    const [h1, m1] = startTime.split(':').map(Number)
    const [h2, m2] = endTime.split(':').map(Number)
    onSave({
      id: initialData.id,
      title: title.trim(),
      location: location.trim(),
      date: new Date(date),
      start: h1 + m1 / 60,
      end: h2 + m2 / 60,
      notes,
      color,
    })
  }

  return (
    <>
      <div className={styles.overlay} onClick={onCancel} />

      <div
        className={styles.modal}
        style={{ top: coords.y, left: coords.x }}
        onClick={e => e.stopPropagation()}
      >
        <div className={`${styles.row} ${styles.firstRow}`}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Event title..."
            value={title}
            maxLength={20}
            onChange={e => setTitle(e.target.value)}
          />
          <div className={styles.dropdown}>
            <button
              className={styles.dropdownBtn}
              onClick={toggleDropdown}
              style={{ borderColor: color }}
            >
              <span
                className={styles.circle}
                style={{ background: color }}
              />
              <span className={styles.arrow}>&gt;</span>
            </button>
            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                {COLORS.map(c => (
                  <div
                    key={c}
                    className={styles.menuItem}
                    style={{ background: c }}
                    onClick={() => {
                      setColor(c)
                      setDropdownOpen(false)
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={`${styles.row} ${styles.secondRow}`}>
          <img src={PlaceIcon} alt="Location" />
          <input
            type="text"
            placeholder="Location"
            value={location}
            maxLength={20}
            onChange={e => setLocation(e.target.value)}
          />
        </div>

        <div className={`${styles.row} ${styles.thirdRow}`}>
          <div
            className={styles.cell}
            onClick={() => dateRef.current?.showPicker()}
          >
            <img src={DateIcon} alt="Date" />
            <input
              ref={dateRef}
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>

          <div
            className={styles.cell}
            onClick={() => startRef.current?.showPicker()}
          >
            <img src={TimeIcon2} alt="Time" />
            <input
              ref={startRef}
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />
            <span>–</span>
            <input
              ref={endRef}
              type="time"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
            />
          </div>
        </div>

        <div className={`${styles.row} ${styles.fourthRow}`}>
          <img src={PenIcon} alt="Notes" />
          <textarea
            className={styles.notesInput}
            placeholder="Add notes..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>

        {errors.length > 0 && (
          <div className={styles.errorMessage}>
            {errors[0]}
          </div>
        )}

        <div className={styles.actions}>
          {mode === 'edit' && onDelete && (
            <button
              className={styles.delete}
              onClick={() => onDelete(initialData.id!)}
            >
              Delete
            </button>
          )}
          <button
            className={styles.save}
            disabled={!canSave}
            onClick={handleSaveClick}
          >
            Save
          </button>
        </div>
      </div>
    </>
  )
}

export default AddEventModal
