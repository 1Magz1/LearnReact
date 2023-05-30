import './styles/index.scss'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import {Suspense} from "react";

import {className} from "helpers/className";
import {useTheme} from "app/providers/ThemeProvider";

import {MainPage} from "pages/MainPage";
import {AboutPage} from "pages/AboutPage";

const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={className('app', {"class1": true}, [theme])}>
      <BrowserRouter>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <Link to="/">Main</Link>
        <Link to="/about">About</Link>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" Component={MainPage}/>
            <Route path="/about" Component={AboutPage}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
