import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import './App.css'
import Main from './pages/Main.tsx'
import Testpage from './pages/TestPage.tsx'
import ProtectedRoutes from './components/ProtectedRoutes.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import NotFound from './pages/NotFound.tsx'

function Logout() {
  localStorage.clear()
  return <Navigate to="/Login" replace/>
}
function RegisterAndLogout() {
  localStorage.clear()
  return <Navigate to="/Register" replace/>
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoutes><Main/></ProtectedRoutes>} />
        <Route path="/test" element={<Testpage/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Logout' element={<Logout/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App 