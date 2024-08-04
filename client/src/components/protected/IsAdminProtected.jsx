 
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {Navigate, useLocation} from "react-router-dom"

const ProtectedAdminRoute = ({children}) => {
    const userFound = useSelector(state => state.user)
    const user = userFound.user;
    const isAdmin = user?.role === 'admin';

     

    let location = useLocation();

    if(!isAdmin) {
        toast.error("You are not authorized to view this page")
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedAdminRoute;