import React from "react";
import "./App.scss";
import { BrowserRouter} from "react-router-dom";
import AppRoutes from "lib/routes/routes";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter >
  );
}

export default App;
