import { Link } from "react-router-dom";

function Navbar() {
    let isLoggedin = false;
  return (
    <nav className="flex justify-between items-center bg-slate-200 px-[50px] sm:px[100px] py-4">
      <Link to="/" className="text-4xl capitalize font-bold">
        Logo
      </Link>
      <div className="hidden sm:flex justify-between items-center gap-[50px]  text-xl capitalize">
        <Link to="/">Home</Link>
        <Link to="/menue">Menue</Link>
        <Link to="/offers">Offers</Link>
        <Link to="login">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="orangered"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
        {isLoggedin && <Link to="/cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="orangered"
            className="size-7"
          >
            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
          </svg>
        </Link>}
      </div>
    </nav>
  );
}

export default Navbar;
