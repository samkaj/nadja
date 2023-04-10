import { useContext } from "react";
import { UserContext } from "../context/User";

const SignedIn = () => {
  const { user } = useContext(UserContext);

  return (
    <main>
      <h1>Hi mom</h1>
      <p>Logged in as {user?.name}</p>
    </main>
  );
};

export default SignedIn;
