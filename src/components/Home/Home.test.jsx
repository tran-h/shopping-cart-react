import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Home from "./Home";
import Products from "../Products/Products";

describe("Home Component", () => {
  it("renders the Home page correctly", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /Browse Products/i });

    expect(
      screen.getByText("Welcome to the Shopping Cart App")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Your go-to place for amazing products")
    ).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });

  it("Home page button redirects to products page", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /Browse Products/i });

    await user.click(link);

    expect(
      screen.getByText(/Welcome to the Products Page!/i)
    ).toBeInTheDocument();
  });
});
