const request = require('supertest');
const { app, db } = require('../src/app');

// Close the database connection after all tests
afterAll(() => {
  if (db) {
    db.close();
  }
});

describe('API Endpoints', () => {
  describe('GET /api/items', () => {
    it('should return all items', async () => {
      const response = await request(app).get('/api/items');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);

      // Check if items have the expected structure
      const item = response.body[0];
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('created_at');
    });

    it('should return an empty array when there are no items', async () => {
      // Clear the items table temporarily
      db.prepare('DELETE FROM items').run();
      
      const response = await request(app).get('/api/items');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
      
      // Re-insert initial data for other tests
      const initialItems = ['Item 1', 'Item 2', 'Item 3'];
      const insertStmt = db.prepare('INSERT INTO items (name) VALUES (?)');
      initialItems.forEach(item => {
        insertStmt.run(item);
      });
    });
    
    it('should handle database errors', async () => {
      // Mock db.prepare to throw an error
      const originalPrepare = db.prepare;
      db.prepare = jest.fn(() => {
        throw new Error('Database error');
      });
      
      const response = await request(app).get('/api/items');
      
      // Restore original function
      db.prepare = originalPrepare;
      
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Failed to fetch items');
    });
  });

  describe('POST /api/items', () => {
    it('should create a new item', async () => {
      const newItem = { name: 'Test Item' };
      const response = await request(app)
        .post('/api/items')
        .send(newItem)
        .set('Accept', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newItem.name);
      expect(response.body).toHaveProperty('created_at');
    });

    it('should return 400 if name is missing', async () => {
      const response = await request(app)
        .post('/api/items')
        .send({})
        .set('Accept', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Item name is required');
    });

    it('should return 400 if name is empty', async () => {
      const response = await request(app)
        .post('/api/items')
        .send({ name: '' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Item name is required');
    });

    it('should return 400 if name is not a string', async () => {
      const response = await request(app)
        .post('/api/items')
        .send({ name: 123 })
        .set('Accept', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Item name is required');
    });
    
    it('should handle database errors during item creation', async () => {
      // Mock the insertStmt.run to throw an error
      const { insertStmt } = require('../src/app');
      const originalRun = insertStmt.run;
      insertStmt.run = jest.fn(() => {
        throw new Error('Database error');
      });
      
      const response = await request(app)
        .post('/api/items')
        .send({ name: 'Will Fail' })
        .set('Accept', 'application/json');
      
      // Restore original function
      insertStmt.run = originalRun;
      
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Failed to create item');
    });
  });

  describe('DELETE /api/items/:id', () => {

    it('should delete an item that is at least 5 days old', async () => {
      // Mock Date.now to return a specific date for this test
      const mockCurrentDate = new Date('2023-01-10T00:00:00Z').getTime();
      const origDateNow = Date.now;
      
      Date.now = jest.fn(() => mockCurrentDate);
      global.Date = class extends Date {
        constructor(date) {
          if (date) {
            return super(date);
          }
          return new Date(mockCurrentDate);
        }
      };
      
      // Insert an item with a created_at date that's older than 5 days
      const oldDate = new Date('2023-01-01T00:00:00Z').toISOString(); // 9 days old
      const stmt = db.prepare('INSERT INTO items (name, created_at) VALUES (?, ?)');
      const result = stmt.run('Old Item', oldDate);
      const itemId = result.lastInsertRowid;

      // Attempt to delete the item
      const deleteResponse = await request(app).delete(`/api/items/${itemId}`);
      
      // Restore Date
      Date.now = origDateNow;
      global.Date = Date;

      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body).toHaveProperty('message');
      expect(deleteResponse.body.message).toBe('Item deleted successfully');

      // Verify it's actually deleted
      const getResponse = await request(app).get('/api/items');
      const deletedItem = getResponse.body.find(item => item.id === itemId);
      expect(deletedItem).toBeUndefined();
    });

    it('should return 403 if item is less than 5 days old', async () => {
      // Mock Date.now to return a specific date for this test
      const mockCurrentDate = new Date('2023-01-10T00:00:00Z').getTime();
      const origDateNow = Date.now;
      
      Date.now = jest.fn(() => mockCurrentDate);
      global.Date = class extends Date {
        constructor(date) {
          if (date) {
            return super(date);
          }
          return new Date(mockCurrentDate);
        }
      };
      
      // Insert an item with a recent created_at date (2 days old)
      const recentDate = new Date('2023-01-08T00:00:00Z').toISOString();
      const stmt = db.prepare('INSERT INTO items (name, created_at) VALUES (?, ?)');
      const result = stmt.run('Recent Item', recentDate);
      const itemId = result.lastInsertRowid;

      // Attempt to delete the item
      const response = await request(app).delete(`/api/items/${itemId}`);
      
      // Restore Date
      Date.now = origDateNow;
      global.Date = Date;

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Cannot delete items newer than 5 days');
      expect(response.body).toHaveProperty('itemAge');
      expect(response.body.itemAge).toBe(2); // 2 days old

      // Verify it's not deleted
      const getResponse = await request(app).get('/api/items');
      const item = getResponse.body.find(item => item.id === itemId);
      expect(item).toBeDefined();
    });

    it('should return 404 if item does not exist', async () => {
      const nonExistentId = 9999;
      const response = await request(app).delete(`/api/items/${nonExistentId}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Item not found');
    });

    it('should return 400 if item ID is invalid', async () => {
      const invalidId = 'not-a-number';
      const response = await request(app).delete(`/api/items/${invalidId}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Invalid item ID');
    });
    
    it('should handle database errors during item deletion', async () => {
      // Insert a test item that's old enough to delete
      const mockCurrentDate = new Date('2023-01-10T00:00:00Z').getTime();
      const origDateNow = Date.now;
      
      Date.now = jest.fn(() => mockCurrentDate);
      global.Date = class extends Date {
        constructor(date) {
          if (date) {
            return super(date);
          }
          return new Date(mockCurrentDate);
        }
      };
      
      // Insert an item with a created_at date that's older than 5 days
      const oldDate = new Date('2023-01-01T00:00:00Z').toISOString(); // 9 days old
      const stmt = db.prepare('INSERT INTO items (name, created_at) VALUES (?, ?)');
      const result = stmt.run('Database Error Test Item', oldDate);
      const itemId = result.lastInsertRowid;
      
      // Mock the db.prepare for DELETE to throw an error
      const originalPrepare = db.prepare;
      let prepareCallCount = 0;
      
      // This will allow the SELECT to work but make the DELETE fail
      db.prepare = jest.fn((query) => {
        prepareCallCount++;
        
        // The first prepare call is for SELECT to check if item exists
        if (prepareCallCount === 1) {
          return originalPrepare(query);
        }
        
        // The second prepare call is for the DELETE operation - throw error
        throw new Error('Database error');
      });
      
      const response = await request(app).delete(`/api/items/${itemId}`);
      
      // Restore original functions
      db.prepare = originalPrepare;
      Date.now = origDateNow;
      global.Date = Date;
      
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Failed to delete item');
    });
  });
});
