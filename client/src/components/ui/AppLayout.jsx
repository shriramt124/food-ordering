import { Outlet } from "react-router"
import Navbar from "../pages/Navbar"

 

function AppLayout() {
  return (
    <div>
        {/* Navbar */}
      <Navbar />
        <main>  
            <Outlet />
        </main>
        {/* Fotter */}
    </div>
  )
}

export default AppLayout