import { useContext } from "react";
import UserContext from "../context/User";

const Home = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <h1>Home</h1>
      {user && <p>Logged in as {user.name}</p>}
    </div>
  );
};

export default Home;
