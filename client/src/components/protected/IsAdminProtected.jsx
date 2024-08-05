import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const userFound = useSelector((state) => state.user);
  const user = userFound.user;
  const isAdmin = user?.role === "admin";
  const token = userFound.token;
  console.log(userFound.user);
  
 

  if (!isAdmin || !token) {
    toast.error("You are not authorized to view this page");
    return <Navigate to="/" />
  }
  return children;
};

export default ProtectedAdminRoute;
