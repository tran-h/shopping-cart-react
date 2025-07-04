import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home Component", () => {
  it("renders the Home page correctly", () => {
    render(<Home />);

    expect(screen.getByText("Home Page")).toBeInTheDocument();
    expect(screen.getByText("Welcome to the Home Page!")).toBeInTheDocument();
  });
});
