import './common/style/index.scss'
import {
  BrowserRouter,
  Routes,
  Route, Link
} from "react-router-dom";
import {MainPage} from "./pages/MainPage/MainPage";
import {AboutPage} from "./pages/AboutPage/AboutPage";

const App = () => {
  return (
    <BrowserRouter>
      <Link to="/">Main</Link>
      <Link to="/about">About</Link>
      <Routes>
        <Route path="/" Component={MainPage}/>
        <Route path="/about" Component={AboutPage}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
