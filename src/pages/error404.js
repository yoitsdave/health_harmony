import * as React from "react";

import ErrorDialogue from "../components/errorDialogue.js";

function Error404({ setHeader }) {
  React.useEffect(() => {
    setHeader("Health Harmony");
  });

  return <ErrorDialogue />;
}

export default Error404;
