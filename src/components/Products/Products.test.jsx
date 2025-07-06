import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import Products from "./Products";

const mockProducts = [
  {
    id: 1,
    title: "Test Product",
    price: 19.99,
    image: "https://example.com/product.jpg",
  },
];

beforeEach(() => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

function FakeLayout() {
  return (
    <Outlet
      context={{
        addToCart: vi.fn(),
      }}
    />
  );
}

describe("Products page", () => {
  it("fetches and renders product cards, increments quantity", async () => {
    render(
      <MemoryRouter initialEntries={["/products"]}>
        <Routes>
          <Route element={<FakeLayout />}>
            <Route path="/products" element={<Products />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/test product/i)).toBeInTheDocument()
    );

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(1);

    await userEvent.click(screen.getByRole("button", { name: "+" }));
    expect(input).toHaveValue(2);
  });
});
