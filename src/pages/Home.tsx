import { useContext } from "react";
import { UserContext } from "../context/User";
import Login from "./Login";

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>Home</h1>
      {user && <p>Logged in as {user.name}</p>}
      {!user && <Login />}
    </div>
  );
};

export default Home;
