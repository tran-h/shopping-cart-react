import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorPage from "./ErrorPage";

describe("ErrorPage Component", () => {
  it("renders the ErrorPage page correctly", () => {
    render(<ErrorPage />);

    expect(screen.getByText("ErrorPage Page")).toBeInTheDocument();
    expect(screen.getByText("Welcome to the ErrorPage Page!")).toBeInTheDocument();
  });
});
