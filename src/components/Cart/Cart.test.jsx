import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Cart from "./Cart";

describe("Cart Component", () => {
  it("renders the Cart page correctly", () => {
    render(<Cart />);

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });
});
