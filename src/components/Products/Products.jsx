import styles from "./Products.module.css";
import { useState, useEffect } from "react";

export default function Products() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <ul className={styles.cardContainer}>
        {data &&
          data.map((product) => (
            <li className={styles.cards} key={product.id}>
              <div className={styles.cardContent}>
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
              </div>
              <p className={styles.price}>${product.price}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
