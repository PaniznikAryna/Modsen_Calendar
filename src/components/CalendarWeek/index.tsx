import React, { useState, useEffect, useMemo, useCallback } from 'react'
import CalendarNav, { type NavProps } from './CalendarNav'
import CalendarGrid from './CalendarGrid'
import CalendarDayGrid from './CalendarDayGrid'
import AddEventModal, { type NewEvent } from './AddEventModal'
import styles from './styles.module.scss'
import type { Event } from './CalendarDayGrid'

const STORAGE_KEY = 'calendarEvents'

function getMonday(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay() === 0 ? 7 : d.getDay()
  d.setDate(d.getDate() - day + 1)
  return d
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

const CalendarWeek: React.FC = () => {
  const [view, setView] = useState<'Week' | 'Day'>('Week')
  const [currentDate, setCurrentDate] = useState(new Date())

  const [events, setEvents] = useState<Event[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    try {
      const arr = JSON.parse(raw) as Array<
        Omit<Event, 'start' | 'end'> & { start: string; end: string }
      >
      return arr.map(e => ({
        ...e,
        start: new Date(e.start),
        end: new Date(e.end),
      }))
    } catch {
      return []
    }
  })

  useEffect(() => {
    const toStore = events.map(e => ({
      ...e,
      start: e.start.toISOString(),
      end: e.end.toISOString(),
    }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore))
  }, [events])

  const onPrev = () =>
    setCurrentDate(d => addDays(d, view === 'Week' ? -7 : -1))
  const onNext = () =>
    setCurrentDate(d => addDays(d, view === 'Week' ? +7 : +1))
  const onToday = () => {
    setView('Day')
    setCurrentDate(new Date())
  }

  const range = useMemo(() => {
    if (view === 'Week') {
      const opts = { month: 'short', day: 'numeric', year: 'numeric' } as const
      const mon = getMonday(currentDate)
      const sun = addDays(mon, 6)
      return `${mon.toLocaleDateString('en-US', opts)} – ${sun.toLocaleDateString(
        'en-US',
        opts
      )}`
    }
    return currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    })
  }, [view, currentDate])

  const navProps: NavProps = {
    view,
    onViewChange: setView,
    range,
    onPrev,
    onNext,
    onToday,
  }

  const [modal, setModal] = useState<{
    open: boolean
    mode: 'create' | 'edit'
    data: Partial<NewEvent> & { id?: string }
    coords: { x: number; y: number }
  }>({
    open: false,
    mode: 'create',
    data: {},
    coords: { x: 0, y: 0 },
  })

  const openCreate = useCallback(
    (date: Date, hour: number, coords: { x: number; y: number }) => {
      setModal({
        open: true,
        mode: 'create',
        data: {
          id: crypto.randomUUID(),
          date,
          start: hour,
          end: hour + 1,
          title: '',
          location: '',
          notes: '',
          color: 'rgba(255,102,51,1)',
        },
        coords,
      })
    },
    []
  )

  const openEdit = useCallback(
    (ev: Event, coords: { x: number; y: number }) => {
      setModal({
        open: true,
        mode: 'edit',
        data: {
          id: ev.id,
          date: ev.start,
          start: ev.start.getHours() + ev.start.getMinutes() / 60,
          end: ev.end.getHours() + ev.end.getMinutes() / 60,
          title: ev.title,
          location: ev.location ?? '',
          notes: ev.notes,
          color: ev.color,
        },
        coords,
      })
    },
    []
  )

  const handleSave = (e: NewEvent & { id?: string }) => {
    const s = new Date(e.date)
    s.setHours(Math.floor(e.start), (e.start % 1) * 60, 0, 0)
    const f = new Date(e.date)
    f.setHours(Math.floor(e.end), (e.end % 1) * 60, 0, 0)

    if (modal.mode === 'edit' && e.id) {
      setEvents(evts =>
        evts.map(x =>
          x.id === e.id ? { ...x, ...e, start: s, end: f } : x
        )
      )
    } else {
      const newId = e.id ?? crypto.randomUUID()
      setEvents(evts => [
        ...evts,
        { id: newId, ...e, start: s, end: f },
      ])
    }

    setModal(m => ({ ...m, open: false }))
  }

  const handleDelete = (id?: string) => {
    if (!id) return
    setEvents(evts => evts.filter(x => x.id !== id))
    setModal(m => ({ ...m, open: false }))
  }

  const weekStart = useMemo(() => getMonday(currentDate), [currentDate])
  const weekDates = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  )

  return (
    <section className={styles.container}>
      <CalendarNav {...navProps} />

      {view === 'Week' ? (
        <CalendarGrid
          weekDates={weekDates}
          events={events}
          onCellClick={openCreate}
          onEventClick={openEdit}
        />
      ) : (
        <CalendarDayGrid
          date={currentDate}
          events={events}
          onCellClick={openCreate}
          onEventClick={openEdit}
        />
      )}

      {modal.open && (
        <AddEventModal
          mode={modal.mode}
          initialData={modal.data as NewEvent}
          coords={modal.coords}
          onSave={handleSave}
          onDelete={modal.mode === 'edit' ? handleDelete : undefined}
          onCancel={() => setModal(m => ({ ...m, open: false }))}
        />
      )}
    </section>
  )
}

export default CalendarWeek
