import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const todoToken = Cookies.get("googleTodo_access_token");

  return todoToken ? element : <Navigate to={"/register"} />;
};

export default PrivateRoute;
