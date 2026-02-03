import request from 'supertest';
import app from '../src/app.js';
import mongoose from 'mongoose';
import { Task } from '../src/models/task.model.js';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('/tasks', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Task.deleteMany({});
  });

  describe('POST /tasks', () => {
    it('should create a new task', async () => {
      const res = await request(app)
        .post('/tasks')
        .send({
          title: 'Test Task',
          description: 'Test Description',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toBe('Test Task');
    });
  });

  describe('GET /tasks', () => {
    it('should return all tasks', async () => {
      const task = new Task({ title: 'Test Task' });
      await task.save();

      const res = await request(app).get('/tasks');
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].title).toBe('Test Task');
    });
  });

  describe('GET /tasks/stats', () => {
    it('should return task statistics', async () => {
        const task = new Task({ title: 'Test Task' });
        await task.save();

      const res = await request(app).get('/tasks/stats');
      expect(res.statusCode).toEqual(200);
      expect(res.body.todo).toBe(1);
    });
  });

  describe('GET /tasks/:id', () => {
    it('should return a single task', async () => {
      const task = new Task({ title: 'Test Task' });
      await task.save();

      const res = await request(app).get(`/tasks/${task._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toBe('Test Task');
    });
  });

  describe('PATCH /tasks/:id', () => {
    it('should update a task', async () => {
      const task = new Task({ title: 'Test Task' });
      await task.save();

      const res = await request(app)
        .patch(`/tasks/${task._id}`)
        .send({ title: 'Updated Task' });

      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toBe('Updated Task');
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('should delete a task', async () => {
      const task = new Task({ title: 'Test Task' });
      await task.save();

      const res = await request(app).delete(`/tasks/${task._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe('Task deleted successfully');
    });
  });
});
