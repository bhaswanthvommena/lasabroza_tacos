import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";
import { Menu } from "./pages/Menu";

describe("menu flow smoke", () => {
  test("adds a breakfast item with selected style", () => {
    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    );

    const itemTitle = screen.getByRole("heading", { name: /Potato & Egg/i });
    const itemCard = itemTitle.closest(".group");
    expect(itemCard).toBeTruthy();
    if (!(itemCard instanceof HTMLElement)) return;

    const styleSelect = within(itemCard).getByDisplayValue("Select Style");
    fireEvent.change(styleSelect, { target: { value: "Taco" } });

    const addButton = within(itemCard).getByRole("button", { name: /Add to Order/i });
    fireEvent.click(addButton);

    expect(within(itemCard).getByText("1")).toBeInTheDocument();
  });
});
