import React from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "routes/routes";
import AppToastify from "components/common/toastify/AppToastify";

function App() {
  return (
    <BrowserRouter>
      <AppToastify />
      <AppRoutes />
    </BrowserRouter >
  );
}

export default App;
