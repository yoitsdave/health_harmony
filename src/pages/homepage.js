import * as React from "react";
import { useNavigate } from "react-router-dom";

function Homepage({ setHeader }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("calendarview");
  });

  return <p> ERROR </p>;
}

export default Homepage;
