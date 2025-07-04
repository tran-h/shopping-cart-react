import "./NavBar.css";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <NavLink to="/" className="logo">
            Shopping Cart App
          </NavLink>
        </div>
        <div className="navbar-right">
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
}
