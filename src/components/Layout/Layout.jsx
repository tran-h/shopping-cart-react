import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export default function Layout() {
  const [cart, setCart] = useState({});

  const totalQty = Object.values(cart).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const addToCart = (product, qty) =>
    setCart((prev) => {
      const existing = prev[product.id];
      const newQty = (existing?.quantity || 0) + qty;
      return {
        ...prev,
        [product.id]: {
          product,
          quantity: newQty,
        },
      };
    });

  return (
    <>
      <NavBar totalQty={totalQty} />
      <Outlet context={{ addToCart }} />
    </>
  );
}
