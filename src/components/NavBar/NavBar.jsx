import styles from "./NavBar.module.css";
import { Link, NavLink } from "react-router-dom";

export default function NavBar({ totalQty }) {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <NavLink to="/" className={styles.logo}>
            Shopping Cart App
          </NavLink>
        </div>
        <div className={styles.navbarRight}>
          <ul className={styles.navLinks}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart ({totalQty})</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
