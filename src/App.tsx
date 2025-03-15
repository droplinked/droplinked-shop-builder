import "assets/style/App.scss"
import AppGDPR from "components/common/app-gdpr/AppGDPR"
import AppToastify from "components/common/toastify/AppToastify"
import React from "react"
import AppRoutes from "routes/routes"

function App() {
  return (
    <>
      <AppToastify />
      <AppRoutes />
      <AppGDPR />
    </>
  )
}

export default App