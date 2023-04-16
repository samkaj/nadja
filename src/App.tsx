import Home from "./pages/Home";
import { UserContextProvider } from "./context/User";
import Callback from "./pages/Callback";
import { Routes, Route } from "react-router-dom";
import "./app.scss";
import { IconContext } from "react-icons";
import Navbar from "./components/navbar/Navbar";

type Page = {
  url: string;
  label: string;
};

const App = () => {
  const links: Page[] = [];
  return (
    <IconContext.Provider value={{ className: "react-icons" }}>
      <UserContextProvider>
        <Navbar links={links} />
        <div id="wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/callback" element={<Callback />} />
          </Routes>
        </div>
      </UserContextProvider>
    </IconContext.Provider>
  );
};

export default App;
