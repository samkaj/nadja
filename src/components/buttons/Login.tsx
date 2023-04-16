import { FaSpotify } from "react-icons/fa";
import Button from "./Button";
import { authorize } from "../../context/User";

const Login = () => {
  return (
    <Button Icon={FaSpotify} onClick={authorize} className="spotify-btn medium">
      {"Sign in with Spotify"}
    </Button>
  );
};

export default Login;
