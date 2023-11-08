import * as React from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setHeader }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    localStorage.clear();
    navigate("/");
  });

  return <p> ERROR </p>;
}

export default Logout;
