import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Booking from './pages/Booking'
import NotFound from './pages/NotFound'
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import WebsiteEditor from './admin/WebsiteEditor'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/booking" element={<Booking />} />

      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="website" element={<WebsiteEditor />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
