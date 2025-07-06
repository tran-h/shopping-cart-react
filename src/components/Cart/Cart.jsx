import { useOutletContext, Link } from "react-router-dom";
import styles from "./Cart.module.css";

const MIN = 1;
const MAX = 99;

export default function Cart() {
  const { cart, setCart } = useOutletContext();

  const items = Object.values(cart);
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const updateQty = (id, n) =>
    setCart((prev) => ({
      ...prev,
      [id]: { ...prev[id], quantity: Math.max(MIN, Math.min(MAX, n)) },
    }));

  const removeItem = (id) =>
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });

  if (items.length === 0)
    return (
      <div className={styles.empty}>
        <h2>Your cart is empty.</h2>
        <Link to="/products" className={styles.shopLink}>
          Browse Products
        </Link>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.cartContent}>
        <h2>Your Shopping Cart</h2>
        <ul className={styles.cartList}>
          {items.map(({ product, quantity }) => (
            <li key={product.id} className={styles.cartItem}>
              <img
                src={product.image}
                alt={product.title}
                className={styles.cartImage}
              />
              <div className={styles.cartDetails}>
                <h3>{product.title}</h3>
                <div className={styles.row}>
                  <span>${product.price.toFixed(2)}</span>
                  <div className={styles.qtyBox}>
                    <button
                      onClick={() => updateQty(product.id, quantity - 1)}
                      disabled={quantity <= MIN}
                    >
                      –
                    </button>
                    <input
                      type="number"
                      min={MIN}
                      max={MAX}
                      value={quantity}
                      onChange={(e) =>
                        updateQty(product.id, parseInt(e.target.value) || MIN)
                      }
                    />
                    <button
                      onClick={() => updateQty(product.id, quantity + 1)}
                      disabled={quantity >= MAX}
                    >
                      +
                    </button>
                  </div>
                  <span className={styles.lineTotal}>
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(product.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <h3 className={styles.total}>Grand Total: ${total.toFixed(2)}</h3>
      </div>
    </div>
  );
}
