import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { kMaxLength } from "buffer";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

it("should add upcomingbooks and buyed", async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  userEvent.click(screen.getByRole("link", { name: "Up Coming Books" }));
  expect(history.location.pathname).toEqual("/upcomingbooks");

  userEvent.click(screen.getByRole("button", { name: "Up Coming Books" }));

  userEvent.type(
    screen.getByRole("textbox", { name: "Title" }),
    "Filosofi Teras"
  );
  userEvent.type(
    screen.getByRole("textbox", { name: "Writer" }),
    "Henry Manampiring"
  );
  userEvent.type(screen.getByRole("spinbutton", { name: "Price" }), "120");
  userEvent.type(
    screen.getByRole("textbox", { name: "Image" }),
    "https://cf.shopee.co.id/file/a75904f1d55399d9d8d8e3ec238eaa99"
  );
  userEvent.type(
    screen.getByRole("textbox", { name: "Reason" }),
    "Just like love, there is no reason"
  );
  userEvent.click(screen.getByRole("button", { name: "Submit" }));

  userEvent.click(screen.getAllByRole("button", { name: "Done" })[1]);

  userEvent.click(screen.getByRole("link", { name: "My Books" }));
  expect(history.location.pathname).toEqual("/mybooks");

  userEvent.click(screen.getAllByRole("button", { name: "Open" })[0]);
  userEvent.click(screen.getByRole("button", { name: "Delete" }));

  userEvent.click(screen.getAllByRole("button", { name: "Open" })[0]);
  userEvent.click(screen.getByRole("button", { name: "Edit" }));

  userEvent.type(
    screen.getByRole("textbox", { name: "Title" }),
    "GRIT & RESSILIENCE"
  );
  userEvent.type(screen.getByRole("spinbutton", { name: "Price" }), "130");
  userEvent.type(
    screen.getByRole("textbox", { name: "Writer" }),
    "Angela Heille"
  );
  userEvent.type(
    screen.getByRole("textbox", { name: "Image" }),
    "https://prodimage.images-bn.com/pimages/9780062316110_p0_v5_s1200x630.jpg"
  );
  userEvent.type(
    screen.getByRole("textbox", { name: "Reason" }),
    "Just Random Reason"
  );

  userEvent.click(screen.getByRole("button", { name: "Finish" }));
  userEvent.click(screen.getByRole("button", { name: "OK" }));

  userEvent.click(screen.getAllByRole("button", { name: "Open" })[0]);
  userEvent.click(screen.getByRole("button", { name: "Cancel" }));

  const input = screen.getByPlaceholderText("Are You Looking For Some Books ?");
  const value = "Ego Is The Enemy";
  userEvent.type(input, value);

  screen.debug(undefined, kMaxLength);
});
