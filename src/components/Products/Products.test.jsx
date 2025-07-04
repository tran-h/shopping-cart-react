import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Products from "./Products";

describe("Products Component", () => {
  it("renders the Products page correctly", () => {
    render(<Products />);

    expect(screen.getByText("Products Page")).toBeInTheDocument();
    expect(screen.getByText("Welcome to the Products Page!")).toBeInTheDocument();
  });
});
