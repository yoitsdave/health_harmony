import * as React from "react";

import ErrorDialogue from "../components/errorDialogue.js";

function Suggested({ setHeader }) {
  React.useEffect(() => {
    setHeader("Suggested Exercises");
  });

  return <ErrorDialogue />;
}

export default Suggested;
