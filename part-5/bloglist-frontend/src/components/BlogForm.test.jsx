import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BlogForm from "./BlogForm";

test("test for new blog form", async () => {
  const addBlog = vi.fn();
  render(<BlogForm handleAddBlog={addBlog} />);
  const user = userEvent.setup();

  const title = screen.getByPlaceholderText("title");
  const author = screen.getByPlaceholderText("author");
  const url = screen.getByPlaceholderText("url");
  const button = screen.getByText("create");

  await user.type(title, "title");
  await user.type(author, "author");
  await user.type(url, "url");

  await user.click(button);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe("title");
  expect(addBlog.mock.calls[0][0].author).toBe("author");
  expect(addBlog.mock.calls[0][0].url).toBe("url");
});
