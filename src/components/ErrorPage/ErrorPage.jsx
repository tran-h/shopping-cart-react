import styles from "./ErrorPage.module.css";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h1>404</h1>
        <p>Oops! The page you are looking for does not exist.</p>
        <Link to="/" className={styles.homeButton}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
