import './styles/index.scss'
import {
  BrowserRouter,
  Link
} from "react-router-dom";

import {className} from "shared/lib/className/className";
import {useTheme} from "app/providers/ThemeProvider";

import {AppRouter} from "app/providers/Router";

const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={className('app', {"class1": true}, [theme])}>
      <BrowserRouter>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <Link to="/">Main</Link>
        <Link to="/about">About</Link>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
};

export default App;
