import { Link} from "react-router-dom";
 

import Drawerui from "./../ui/Drawer";
import { useSelector } from "react-redux";
import AddProductModal from "../admin/AddProduct";
 

function Navbar({updateProduct}) {
  
 
   const userFound = useSelector(state => state.user)
   console.log(userFound)
   const isLoggedIn = userFound.token !== null;
   const user = userFound.user ?? null;
   const role = user?.role;
  const isAdmin = role === "admin";
  
   function handleLogout(){
     //remove the user and token from the local storage
     localStorage.removeItem("token");
     localStorage.removeItem("user");
      window.location.href="/"
   }
 

  return (
    <nav className="flex justify-between items-center bg-gradient-to-r from-black to-gray-800 text-gray-100 px-[20px] sm:px-[50px]   py-[40px] font-roboto">
      <Link to="/" className="text-4xl uppercase">
        Logo
      </Link>
      <div className="hidden tab:flex gap-10 text-xl uppercase">
        <Link to="/">Home</Link>
        <Link to="/products">Menue</Link>
       {!isAdmin && <Link  >about</Link>}
      {!isAdmin &&  <Link to="/book-table">book table</Link>}
      {isAdmin && <Link to="/dashboard">dashboard</Link>}
      {isAdmin &&  
      (<AddProductModal updateProduct={updateProduct}/>)
      }
      </div>
      <div className="flex gap-6">
        {!isLoggedIn && (
          <Link to="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-7"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        )}
      {!isAdmin &&  <Link >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-7"
          >
            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
          </svg>
        </Link>}
       {isLoggedIn && <Link onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="size-7"
          >
            <path
              fillRule="evenodd"
              d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>}
        <p className="tab:hidden">
          <Drawerui updateProduct={updateProduct}/>
        </p>
      </div>
    </nav>
  );
}

export default Navbar;
