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

  test("finds a book regardless of case and surrounding spaces", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText("Search"), "  dune ");
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.map((heading) => heading.textContent)).toEqual(["Dune"]);
  });

  test("marks a book as read and updates the screen immediately", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      screen.getByRole("button", { name: "Mark Gone Girl as read" })
    );
    expect(
      screen.getByRole("button", { name: "Mark Gone Girl as unread" })
    ).toBeInTheDocument();
    expect(screen.getByText(/3 of 5 read/)).toBeInTheDocument();
  });

  test("removes the clicked book while a genre filter is active", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(screen.getByLabelText("Genre"), "sci-fi");
    await user.click(screen.getByRole("button", { name: "Remove Neuromancer" }));
    await user.selectOptions(screen.getByLabelText("Genre"), "all");
    expect(
      screen.queryByRole("heading", { name: "Neuromancer" })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "The Hobbit" })
    ).toBeInTheDocument();
  });

  test("shows the average rating of the rated books only", () => {
    render(<App />);
    expect(screen.getByText(/Average rating: 4$/)).toBeInTheDocument();
  });

  test("shows a dash if no book is rated", async () => {
    const user = userEvent.setup();
    render(<App />);
    for (const title of ["Dune", "The Hobbit", "Neuromancer"]) {
      await user.click(screen.getByRole("button", { name: `Remove ${title}` }));
    }
    expect(screen.getByText(/Average rating: –$/)).toBeInTheDocument();
  });
});
