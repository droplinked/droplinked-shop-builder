import React from "react";
import AppRoutes from "routes/routes";
import { BrowserRouter } from "react-router-dom";

// Styles
import "assest/style/App.scss";

// Components
import AppToastify from "components/common/toastify/AppToastify";
import AppGDPR from "components/common/app-gdpr/AppGDPR";
import ScrollToTop from "components/layouts/scroll-to-top/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <AppToastify />
      <AppRoutes />
      <AppGDPR />
      <ScrollToTop />
    </BrowserRouter >
  );
}

export default App;
