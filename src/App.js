import logo from './logo.svg';
import './App.scss';
import MainPage from './layout/MainPage'
import NotFound from './layout/NotFound'
import Buy from './layout/Buy'
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route  exact path="/" element={<MainPage />} />
          <Route   path="/buy" element={<Buy />} />
          <Route   path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
