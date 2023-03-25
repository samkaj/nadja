import Home from "./pages/Home";
import UserContext, { User, UserContextType } from "./context/User";
import { useState } from "react";

const App = () => {
  const [user, setUser] = useState<User>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Home />
    </UserContext.Provider>
  );
};

export default App;
