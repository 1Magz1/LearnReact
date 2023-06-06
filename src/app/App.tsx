import './styles/index.scss'
import {BrowserRouter} from "react-router-dom";

import {classNames} from "shared/lib/classNames/classNames";
import {useTheme} from "app/providers/ThemeProvider";

import {AppRouter} from "app/providers/Router";
import {Navbar} from "widgets/Navbar";

const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {"class1": true}, [theme])}>
      <BrowserRouter>
        <Navbar/>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
};

export default App;
