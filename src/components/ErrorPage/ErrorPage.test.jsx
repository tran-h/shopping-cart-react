import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import ErrorPage from "./ErrorPage";
import Home from "../Home/Home";

describe("ErrorPage Component", () => {
  it("renders the ErrorPage page correctly", () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /Go Back Home/i });

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(
      screen.getByText("Oops! The page you are looking for does not exist.")
    ).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });

  it("ErrorPage button redirects to home page", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/non-existent-route"]}>
        <Routes>
          <Route path="/non-existent-route" element={<ErrorPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /Go Back Home/i });

    await user.click(link);

    expect(
      screen.getByText(/Welcome to the Shopping Cart App/i)
    ).toBeInTheDocument();
  });
});
