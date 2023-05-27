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
import {useTheme} from "./context/theme/useTheme";

const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={`app ${theme}`}>
      <BrowserRouter>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <Link to="/">Main</Link>
        <Link to="/about">About</Link>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" Component={MainPageAsync}/>
            <Route path="/about" Component={AboutPageAsync}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
