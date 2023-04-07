import { useContext } from "react";
import { UserContext } from "../context/User";

const SignedIn = () => {
  const { user } = useContext(UserContext);

  return (
    <main>
      <h1>Sign In</h1>
      <p>Welcome, {user?.name}</p>
    </main>
  );
};

export default SignedIn;
