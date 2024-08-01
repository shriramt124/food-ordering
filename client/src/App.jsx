 
import { Route, Routes } from 'react-router'
import './App.css'
import AppLayout from './components/ui/AppLayout'
import Home from './components/pages/Home'
import Signup from './components/pages/Signup'
import Login from './components/pages/Login'
import Profile from './components/pages/Profile'
import  { Toaster } from 'react-hot-toast';
import Products from './components/pages/Products'

function App() {
 

  return (
   <>
   <Routes>
    <Route element={<AppLayout />}  >
     <Route index path="/" element={<Home />}/>
    <Route path="/signup" element={<Signup />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/profile" element={<Profile />}/>
    <Route path="/products" element={<Products />}/>
      {/* Prouct */}
      {/* cart */}
    </Route>
   </Routes>
   <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
  
   </>
  )
}

export default App
