import { useContext } from "react";
import { UserContext } from "../context/User";
import Welcome from "../views/Welcome";
import Login from "./Login";
import SignedIn from "../views/SignedIn";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {!user && <Welcome loginButton={<Login />} />}
      {user && <SignedIn />}
    </>
  );
};

export default Home;
