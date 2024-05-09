import "assest/style/App.scss";
import AppToastify from "components/common/toastify/AppToastify";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "routes/routes";

function App() {
  return (
    <BrowserRouter>
      <AppToastify />
      <AppRoutes />
    </BrowserRouter >
  );
}

export default App;
