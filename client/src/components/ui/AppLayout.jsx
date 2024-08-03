import { Outlet } from "react-router"
import Navbar from "../pages/Navbar"

 

function AppLayout() {
  return (
    <div>
        {/* Navbar */}
      <Navbar />
        <main className="font-roboto">  
            <Outlet />
        </main>
        {/* Fotter */}
    </div>
  )
}

export default AppLayout