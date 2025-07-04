import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Shop from "./Shop";

describe("Shop Component", () => {
  it("renders the Shop page correctly", () => {
    render(<Shop />);

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });
});
