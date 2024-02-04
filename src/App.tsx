import React from "react";
import "assest/style/App.scss";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "routes/routes";
import AppToastify from "components/common/toastify/AppToastify";

function App() {

  
  return (
    <BrowserRouter>
      {/* toast box */}
      <AppToastify />

      {/* Routes */}
      <AppRoutes />
    </BrowserRouter >
  );
}

export default App;
