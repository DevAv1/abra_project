import "./header.scss";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__container__logo">
          <span>Herolo</span>
        </div>
        <div className="header__container__items">
          <div className="header_item">
            <Link to="/">
              <Button variant="contained">Home</Button>
            </Link>
          </div>
          <div className="header_item">
            <Link to="/favorites">
              <Button variant="contained">Favorites</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
