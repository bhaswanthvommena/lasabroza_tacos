import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, test } from "vitest";
import { routes } from "./routes";

describe("routes smoke", () => {
  test("renders home route", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    render(<RouterProvider router={router} />);

    expect(await screen.findByText(/Taste The/i)).toBeInTheDocument();
  });

  test("renders menu route", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/menu"] });
    render(<RouterProvider router={router} />);

    expect(await screen.findByRole("heading", { name: /menu/i })).toBeInTheDocument();
  });
});
