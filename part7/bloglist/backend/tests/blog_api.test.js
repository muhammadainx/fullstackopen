const { describe, test, beforeEach, after } = require('node:test');
const assert = require('node:assert');

const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const helper = require('./test_helper');

const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

let headers;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const newUser = {
    username: 'Jacob',
    name: 'Jacob Smith',
    password: 'jacobpwd',
  };

  await api.post('/api/users').send(newUser);
  const result = await api.post('/api/login').send(newUser);
  headers = { Authorization: `Bearer ${result.body.token}` };

  await Promise.all(
    helper.initialBlogs.map((blog) =>
      api.post('/api/blogs').set(headers).send(blog),
    ),
  );
});

describe('retrieval of all blogs', () => {
  test('should return blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('should return correct amount of blogs', async () => {
    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test('should have a unique identifier property named id', async () => {
    const response = await api.get('/api/blogs');
    response.body.forEach((blog) => {
      assert.ok(blog.id);
      assert.strictEqual(blog._id, undefined);
    });
  });
});

describe('addition of a new blog', () => {
  test('should succeed with valid data', async () => {
    const newBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 3,
    };

    await api
      .post('/api/blogs')
      .set(headers)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    assert(titles.includes(newBlog.title));
  });

  test('should default likes to 0 when property is missing', async () => {
    const newBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
    };

    const response = await api
      .post('/api/blogs')
      .set(headers)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.likes, 0);
  });

  test('should return 400 if title is missing', async () => {
    const newBlog = {
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 3,
    };

    await api.post('/api/blogs').set(headers).send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });

  test('should return 400 if author is missing', async () => {
    const newBlog = {
      title: 'React patterns',
      url: 'https://reactpatterns.com/',
      likes: 3,
    };

    await api.post('/api/blogs').set(headers).send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });

  test('should return 400 if url is missing', async () => {
    const newBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 3,
    };

    await api.post('/api/blogs').set(headers).send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });

  test('should return 401 if token is not provided', async () => {
    const newBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 3,
    };

    await api.post('/api/blogs').send(newBlog).expect(401);

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });
});

describe('updating a blog', () => {
  test('should update a blog and return updated blog when id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = { ...blogsAtStart[0] };
    blogToUpdate.likes++;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd.find((b) => b.id === blogToUpdate.id);

    assert.deepStrictEqual(updatedBlog, blogToUpdate);
  });

  test('should return 404 if blog does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId();

    const updatedData = {
      title: "Won't update",
      author: 'Nobody',
      url: 'https://no-url.com',
      likes: 0,
    };

    await api
      .put(`/api/blogs/${validNonExistingId}`)
      .send(updatedData)
      .expect(404);
  });

  test('should return 400 if id is malformed', async () => {
    const invalidId = 'invalid-id';

    const updatedData = {
      title: "Won't update",
      author: 'Nobody',
      url: 'https://no-url.com',
      likes: 0,
    };

    await api.put(`/api/blogs/${invalidId}`).send(updatedData).expect(400);
  });
});

describe('deletion of a blog', () => {
  test('should return 204 when id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).set(headers).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    const ids = blogsAtEnd.map((b) => b.id);
    assert(!ids.includes(blogToDelete.id));

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
  });

  test('should return 400 if id is malformed', async () => {
    const invalidId = 'invalid-id';

    await api.delete(`/api/blogs/${invalidId}`).set(headers).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });

  test('should return 403 if user tries to delete a blog that does not belong to them', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    const otherUser = {
      username: 'james',
      name: 'James Smith',
      password: 'jamespwd',
    };

    await api.post('/api/users').send(otherUser);
    const result = await api.post('/api/login').send(otherUser);
    const otherHeaders = { Authorization: `Bearer ${result.body.token}` };

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(otherHeaders)
      .expect(403);

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
