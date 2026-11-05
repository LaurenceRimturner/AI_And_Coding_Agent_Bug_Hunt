import { describe, expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  test("renders all books", () => {
    render(<App />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(5);
  });

  test("shows only the books of the selected genre", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(screen.getByLabelText("Genre"), "sci-fi");
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);
  });
});
