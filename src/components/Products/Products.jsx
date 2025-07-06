import styles from "./Products.module.css";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const MIN = 1;
const MAX = 99;

export default function Products() {
  const { addToCart } = useOutletContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState({});

  const getQty = (id) => qty[id] || 1;
  const setOne = (id, n) =>
    setQty((prev) => ({ ...prev, [id]: Math.max(MIN, Math.min(MAX, n)) }));
  const inc = (id) => setOne(id, getQty(id) + 1);
  const dec = (id) => setOne(id, getQty(id) - 1);

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
        {data.map((product) => (
          <li className={styles.cards} key={product.id}>
            <div className={styles.cardContent}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
            </div>
            <div className={styles.cardFooter}>
              <p className={styles.price}>${product.price.toFixed(2)}</p>
              <div className={styles.controls}>
                <button
                  onClick={() => dec(product.id)}
                  disabled={getQty(product.id) <= MIN}
                >
                  –
                </button>
                <input
                  type="number"
                  min={MIN}
                  max={MAX}
                  value={getQty(product.id)}
                  onChange={(e) => setOne(product.id, +e.target.value || MIN)}
                />
                <button
                  onClick={() => inc(product.id)}
                  disabled={getQty(product.id) >= MAX}
                >
                  +
                </button>
                <button
                  className={styles.addToCart}
                  onClick={() => addToCart(product, getQty(product.id))}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
