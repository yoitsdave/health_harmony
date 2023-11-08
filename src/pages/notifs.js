import * as React from "react";

import ErrorDialogue from "../components/errorDialogue.js";

function Notifications({ setHeader }) {
  React.useEffect(() => {
    setHeader("Health Harmony Notifications");
  });

  return <ErrorDialogue />;
}

export default Notifications;
