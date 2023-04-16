import { useContext } from "react";
import { UserContext } from "../context/User";
import Welcome from "../views/welcome/Welcome";
import Login from "../components/buttons/Login";
import Dashboard from "../views/dashboard/Dashboard";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {!user && <Welcome loginButton={<Login />} />}
      {user && <Dashboard />}
    </>
  );
};

export default Home;
