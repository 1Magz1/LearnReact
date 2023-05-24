import './styles/index.scss'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import {MainPageAsync} from "./pages/MainPage/MainPage.async";
import {AboutPageAsync} from "./pages/AboutPage/AboutPage.async";
import {Suspense} from "react";

const App = () => {
  return (
    <BrowserRouter>
      <Link to="/">Main</Link>
      <Link to="/about">About</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" Component={MainPageAsync}/>
          <Route path="/about" Component={AboutPageAsync}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
