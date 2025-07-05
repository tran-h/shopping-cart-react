import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

describe("Home Component", () => {
  it("renders heading and button correctly", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /welcome to the shopping cart app/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /browse products/i })
    ).toBeInTheDocument();
  });
});
