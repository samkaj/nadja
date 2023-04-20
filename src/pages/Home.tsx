import { useContext } from "react";
import { UserContext } from "../context/User";
import Welcome from "../views/welcome/Welcome";
import Login from "../components/buttons/Login";
import Generate from "../views/playlist-generator/Generator";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {!user && <Welcome loginButton={<Login />} />}
      {user && <Generate />}
    </>
  );
};

export default Home;
