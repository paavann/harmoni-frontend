import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/auth/Login'
import Home from './pages/Home'
import Layout from './components/Layout'
import Signup from './pages/auth/Signup'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />

        {/* Protected Routes   */}
        <Route element={<ProtectedRoute />}>
          <Route index element={<Home />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App