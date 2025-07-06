import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import Cart from "./Cart";

const item = {
  product: {
    id: 1,
    title: "Test Product",
    price: 10,
    image: "test.jpg",
  },
  quantity: 2,
};

function FakeLayout({ cartOverride }) {
  const mockSetCart = vi.fn();
  return (
    <Outlet
      context={{
        cart: cartOverride,
        setCart: mockSetCart,
      }}
    />
  );
}

describe("Cart page", () => {
  it("shows empty state", () => {
    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <Routes>
          <Route element={<FakeLayout cartOverride={{}} />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("renders cart items and grand total", () => {
    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <Routes>
          <Route element={<FakeLayout cartOverride={{ 1: item }} />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/test product/i)).toBeInTheDocument();
    expect(screen.getByText(/grand total: \$20\.00/i)).toBeInTheDocument();
  });

  it("removes item from cart when ✕ clicked", () => {
    const setCartSpy = vi.fn();
    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <Routes>
          <Route
            element={
              <Outlet
                context={{
                  cart: { 1: item },
                  setCart: setCartSpy,
                }}
              />
            }
          >
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /✕/i }));
    expect(setCartSpy).toHaveBeenCalled();
  });
});
