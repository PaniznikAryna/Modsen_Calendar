import { Routes, Route, Navigate } from 'react-router-dom'
import SignInPage from '@/pages/SignInPage'

import CalendarWeekPage from '@/pages/CalendarWeekPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/calendar/week" element={<CalendarWeekPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
