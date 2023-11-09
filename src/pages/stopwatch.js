import * as React from "react";

import ErrorDialogue from "../components/errorDialogue.js";

function Stopwatch({ setHeader }) {
  React.useEffect(() => {
    setHeader("Stopwatch");
  });

  return <ErrorDialogue />;
}

export default Stopwatch;
