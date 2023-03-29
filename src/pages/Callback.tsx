import { useContext, useEffect } from "react";
import { UserContext, loginUser } from "../context/User";
import { Navigate } from "react-router-dom";

const Callback = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const load = async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      if (code && !user) {
        await loginUser(code).then((user) => {
          if (user) setUser(user);
        });
      }
    };

    load();
  }, [setUser, user]);

  return <>{user && <Navigate to="/" />}</>;
};

export default Callback;
