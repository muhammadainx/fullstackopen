import { beforeEach, describe, test, expect } from "@playwright/test";

import { loginWith, createBlog } from "./helper";

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        username: "jack",
        name: "Jack Smith",
        password: "jackpwd",
      },
    });

    // Add second user
    await request.post("/api/users", {
      data: {
        username: "jane",
        name: "Jane Smith",
        password: "janepwd",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Log in to application")).toBeVisible();

    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();

    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "jack", "jackpwd");

      await expect(page.getByText("jack logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "jack", "wrongpwd");

      const errorDiv = page.locator(".error");
      await expect(errorDiv).toContainText("invalid username or password");
      await expect(errorDiv).toHaveCSS("border-style", "solid");
      await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

      await expect(page.getByText("jack logged in")).not.toBeVisible();
    });
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "jack", "jackpwd");
    });

    test("a new blog can be created", async ({ page }) => {
      const newBlog = {
        title: "E2E Tests with Playwright",
        author: "James Smith",
        url: "https://www.example.com/e2e-playwright",
      };

      await createBlog(page, newBlog);

      await expect(
        page.getByText("E2E Tests with Playwright James Smith"),
      ).toBeVisible();
    });

    describe("and a blog exists", () => {
      beforeEach(async ({ page }) => {
        const newBlog = {
          title: "E2E Tests with Playwright",
          author: "James Smith",
          url: "https://www.example.com/e2e-playwright",
        };

        await createBlog(page, newBlog);
      });

      test("a blog can be liked", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();

        await expect(page.getByText("likes 0")).toBeVisible();

        await page.getByRole("button", { name: "like" }).click();

        await expect(page.getByText("likes 1")).toBeVisible();
      });

      test("the user who added a blog can delete it", async ({ page }) => {
        page.on("dialog", (dialog) => dialog.accept());

        await page.getByRole("button", { name: "view" }).click();
        await page.getByRole("button", { name: "remove" }).click();

        await expect(
          page.getByText("E2E Tests with Playwright James Smith"),
        ).not.toBeVisible();
      });

      test("only the creator can see the delete button", async ({ page }) => {
        await page.getByRole("button", { name: "logout" }).click();
        await loginWith(page, "jane", "janepwd");

        await page.getByRole("button", { name: "view" }).click();

        await expect(
          page.getByRole("button", { name: "remove" }),
        ).not.toBeAttached();
      });
    });

    describe("and several blogs exist", () => {
      beforeEach(async ({ page }) => {
        const blogs = [
          {
            title: "blog one",
            author: "James Smith",
            url: "https://www.example.com/blog-one",
          },
          {
            title: "blog two",
            author: "Jake Smith",
            url: "https://www.example.com/blog-two",
          },
          {
            title: "blog three",
            author: "John Smith",
            url: "https://www.example.com/blog-three",
          },
        ];

        await createBlog(page, blogs[0]);
        await createBlog(page, blogs[1]);
        await createBlog(page, blogs[2]);
      });

      test("blogs are ordered by likes, most liked first", async ({ page }) => {
        const blogOne = page.locator(".blog").filter({ hasText: "blog one" });
        const blogTwo = page.locator(".blog").filter({ hasText: "blog two" });
        const blogThree = page
          .locator(".blog")
          .filter({ hasText: "blog three" });

        await blogOne.getByRole("button", { name: "view" }).click();
        await blogTwo.getByRole("button", { name: "view" }).click();
        await blogThree.getByRole("button", { name: "view" }).click();

        await blogTwo.getByRole("button", { name: "like" }).click();
        await expect(blogTwo.getByText("likes 1")).toBeVisible();
        await blogTwo.getByRole("button", { name: "like" }).click();
        await expect(blogTwo.getByText("likes 2")).toBeVisible();

        await blogThree.getByRole("button", { name: "like" }).click();
        await expect(blogThree.getByText("likes 1")).toBeVisible();

        const blogs = page.locator(".blog");
        await expect(blogs.nth(0)).toContainText("blog two");
        await expect(blogs.nth(1)).toContainText("blog three");
        await expect(blogs.nth(2)).toContainText("blog one");
      });
    });
  });
});
