import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/staff-login", {state: {"loggedout": true}});
  }, [navigate]);

  return null;
}

export default Logout;