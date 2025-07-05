import styles from "./Home.module.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Welcome to the Shopping Cart App</h1>
        <p>Your go-to place for amazing products</p>
        <Link to="/products" className={styles.heroButton}>
          Browse Products
        </Link>
      </div>
    </div>
  );
}
