import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import Products from "./Products";

//Mock the fetch call
beforeEach(() => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            title: "Test Product",
            price: 19.99,
            image: "https://example.com/product.jpg",
          },
        ]),
    })
  );
});

//Fake Layout to provide context
function FakeLayout() {
  const fakeContext = {
    addToCart: vi.fn(),
    getQty: () => 1,
    setQty: vi.fn(),
    cart: {},
  };

  return <Outlet context={fakeContext} />;
}

describe("Products Page", () => {
  it("renders product cards after fetching", async () => {
    render(
      <MemoryRouter initialEntries={["/products"]}>
        <Routes>
          <Route element={<FakeLayout />}>
            <Route path="/products" element={<Products />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    //Loading indicator
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    //Wait for product card to render
    await waitFor(() => {
      expect(screen.getByText(/test product/i)).toBeInTheDocument();
      expect(screen.getByText(/\$19\.99/)).toBeInTheDocument();
    });

    const image = screen.getByRole("img", { name: /test product/i });
    expect(image).toHaveAttribute("src", "https://example.com/product.jpg");
  });
});
