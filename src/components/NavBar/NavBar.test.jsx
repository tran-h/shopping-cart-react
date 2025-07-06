import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "./NavBar";

describe("NavBar", () => {
  it("renders all navigation links and shows cart count", () => {
    render(
      <MemoryRouter>
        <NavBar totalQty={3} />
      </MemoryRouter>
    );

    expect(screen.getByText(/shopping cart app/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /products/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cart \(3\)/i })).toBeInTheDocument();
  });
});
