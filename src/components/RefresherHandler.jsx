import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RefresherHandler = () => {
  const todoToken = Cookies.get("googleTodo_access_token") || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (todoToken !== "") {
      if (window.location.pathname === "/register") {
        navigate("/", { replace: true });
      }
    }
  }, [navigate, todoToken]);

  return <></>;
};

export default RefresherHandler;
