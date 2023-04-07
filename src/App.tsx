import Home from "./pages/Home";
import { UserContextProvider } from "./context/User";
import Callback from "./pages/Callback";
import { Routes, Route } from "react-router-dom";
import "./css/main.css";
import { IconContext } from "react-icons";

const App = () => {
  return (
    <IconContext.Provider value={{ className: "react-icons" }}>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </UserContextProvider>
    </IconContext.Provider>
  );
};

export default App;
