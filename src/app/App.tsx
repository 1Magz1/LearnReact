import './styles/index.scss'
import {Suspense} from "react";
import {BrowserRouter} from "react-router-dom";

import {classNames} from "shared/lib/classNames/classNames";
import {useTheme} from "app/providers/ThemeProvider";

import {AppRouter} from "app/providers/Router";
import {Navbar} from "widgets/Navbar";

import "shared/config/i18n/i18n";

const App = () => {
  const {theme} = useTheme();

  return (
    <div className={classNames('app', {"class1": true}, [theme])}>
      <Suspense fallback="">
        <BrowserRouter>
          <Navbar/>
          <AppRouter/>
        </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default App;
