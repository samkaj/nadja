import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import Button, { LinkButton } from "../buttons/Button";
import { UserContext, authorize } from "../../context/User";
import { FaUser } from "react-icons/fa";

type NavbarProps = {
  links: { url: string; label: string }[];
};

const ProfileButton = () => {
  const [showList, setShowList] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const onHover = () => {
    setShowList(true);
  };

  const onLeave = () => {
    setShowList(false);
  };

  return (
    <div onClick={onHover} onMouseLeave={onLeave}>
      <div className="profile-box">
        {user?.imageUrl && (
          <img src={user?.imageUrl} alt="Profile" className="profile-pic" />
        )}
        {!user?.imageUrl && <FaUser className="profile-pic-def" />}
        <p className="profile-name small">{user?.name}</p>
      </div>
      {showList && (
        <ul className="profile-list shadow-big">
          <li className="small full-width">
            <LinkButton onClick={() => setUser(null)}>Logout</LinkButton>
          </li>
        </ul>
      )}
    </div>
  );
};

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  const { user } = useContext(UserContext);

  return (
    <nav className="navbar shadow">
      <div className="navbar__left">
        <Link to="/">
          <p className="navbar__logo">Nadja</p>
        </Link>
        {links.map((link) => (
          <Link to={link.url} className="navbar__link" key={link.url}>
            {link.label}
          </Link>
        ))}
      </div>
      <div className="navbar__right">
        {!user && (
          <Button className="hollow" onClick={() => authorize()}>
            Sign in
          </Button>
        )}
        {user && <ProfileButton />}
      </div>
    </nav>
  );
};

export default Navbar;
