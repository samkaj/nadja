import Home from "./pages/Home";
import { UserContextProvider } from "./context/User";
import Callback from "./pages/Callback";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </UserContextProvider>
  );
};

export default App;
