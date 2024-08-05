import { Outlet } from "react-router"
import Navbar from "../pages/Navbar"
import Footerui from "../pages/Footerui"

 

function AppLayout() {
  return (
    <div className="  ">
        {/* Navbar */}
        <div>
      <Navbar />

        </div>
        <main className="font-roboto">  
            <Outlet />
        </main>
        
       
        {/* Fotter */}
    </div>
  )
}

export default AppLayout