import React from "react";
import AppRoutes from "routes/routes";

// Styles
import "assets/style/App.scss";

// Components
import AppToastify from "components/common/toastify/AppToastify";
import AppGDPR from "components/common/app-gdpr/AppGDPR";

function App() {
  return (
    <>
      <AppToastify />
      <AppRoutes />
      <AppGDPR />
    </>
  );
}

export default App;
