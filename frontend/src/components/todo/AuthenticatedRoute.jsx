import { Navigate } from "react-router-dom";
import {PropTypes} from "prop-types";
import { useAuth } from "./security/AuthContext";

const AuthenticatedRoute = ({children}) => {
  const {isAuthenticated} = useAuth();

  if (isAuthenticated) return <>{children}</>
  return <Navigate to="/" />
}

export default AuthenticatedRoute;

AuthenticatedRoute.propTypes = {
  children: PropTypes.any
}