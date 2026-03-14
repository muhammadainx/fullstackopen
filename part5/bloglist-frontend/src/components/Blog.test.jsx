import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";

const blog = {
  title: "React Testing Library",
  author: "Sarah Johnson",
  url: "https://example.com/js-closures",
  likes: 10,
  user: {
    username: "jack",
    name: "Jack Smith",
  },
};

const user = {
  username: "jack",
  name: "Jack Smith",
};

const updateLikesMock = vi.fn();
const removeBlogMock = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();

  render(
    <Blog
      blog={blog}
      user={user}
      updateLikes={updateLikesMock}
      removeBlog={removeBlogMock}
    />,
  );
});

describe("Blog component", () => {
  test("renders title and author but not url or likes by default", () => {
    const summary = screen.getByText("React Testing Library Sarah Johnson");
    expect(summary).toBeInTheDocument();

    const url = screen.queryByText("https://example.com/js-closures");
    expect(url).not.toBeInTheDocument();

    const likes = screen.queryByText("likes 10");
    expect(likes).not.toBeInTheDocument();
  });

  test("shows url and likes when view button is clicked", async () => {
    const user = userEvent.setup();

    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const url = screen.getByText("https://example.com/js-closures");
    expect(url).toBeInTheDocument();

    const likes = screen.getByText("likes 10");
    expect(likes).toBeInTheDocument();
  });

  test("calls updateLikes twice when like button is clicked twice", async () => {
    const user = userEvent.setup();

    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(updateLikesMock).toHaveBeenCalledTimes(2);
  });
});
