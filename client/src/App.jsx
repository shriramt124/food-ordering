 
import { Route, Routes } from 'react-router'
import './App.css'
import AppLayout from './components/ui/AppLayout'
import Home from './components/pages/Home'
import Signup from './components/pages/Signup'
import Login from './components/pages/Login'

function App() {
 

  return (
   <>
   <Routes>
    <Route element={<AppLayout />}  >
     <Route index path="/" element={<Home />}/>
    <Route path="/signup" element={<Signup />}/>
    <Route path="/login" element={<Login />}/>
      {/* Prouct */}
      {/* cart */}
    </Route>
   </Routes>
   </>
  )
}

export default App
