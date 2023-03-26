import Home from "./pages/Home";
import UserContext, { User } from "./context/User";
import { useState } from "react";
import Login from "./pages/Login";
import Callback from "./pages/Callback";
import { Routes, Route, Outlet, Link, Router } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState<User>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
