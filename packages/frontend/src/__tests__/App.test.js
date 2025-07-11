import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../App';

// Mock data for tests
const mockItems = [
  { id: 1, name: 'Item 1', created_at: '2023-01-01T00:00:00.000Z' },
  { id: 2, name: 'Item 2', created_at: '2023-01-02T00:00:00.000Z' },
  { id: 3, name: 'Item 3', created_at: '2023-01-03T00:00:00.000Z' }
];

// Setup MSW server to intercept API requests
const server = setupServer(
  // GET items endpoint
  rest.get('/api/items', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockItems));
  }),
  
  // POST items endpoint
  rest.post('/api/items', (req, res, ctx) => {
    const { name } = req.body;
    const newItem = {
      id: mockItems.length + 1,
      name,
      created_at: new Date().toISOString()
    };
    return res(ctx.status(201), ctx.json(newItem));
  }),
  
  // DELETE items endpoint
  rest.delete('/api/items/:id', (req, res, ctx) => {
    const { id } = req.params;
    // For testing error scenarios
    if (id === '999') {
      return res(ctx.status(404), ctx.json({ error: 'Item not found' }));
    }
    return res(ctx.status(200), ctx.json({ message: 'Item deleted successfully' }));
  })
);

// Setup and teardown MSW server
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App Component', () => {
  describe('Initial Data Loading', () => {
    it('should display loading state initially', () => {
      render(<App />);
      expect(screen.getByText('Loading data...')).toBeInTheDocument();
    });

    it('should display items after successful data fetch', async () => {
      render(<App />);
      
      // Wait for items to load
      await waitFor(() => {
        expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
      });
      
      // Check if all mock items are displayed
      mockItems.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
      });
    });

    it('should handle network errors when fetching data', async () => {
      // Override the server response for this test only
      server.use(
        rest.get('/api/items', (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ error: 'Server error' }));
        })
      );
      
      render(<App />);
      
      // Wait for error message to be displayed
      await waitFor(() => {
        expect(screen.getByText(/Failed to fetch data/)).toBeInTheDocument();
      });
    });

    it('should display empty state when no items are returned', async () => {
      // Override the server response to return empty array
      server.use(
        rest.get('/api/items', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json([]));
        })
      );
      
      render(<App />);
      
      // Wait for loading to finish
      await waitFor(() => {
        expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
      });
      
      // Check if empty state message is displayed
      expect(screen.getByText('No items found. Add some!')).toBeInTheDocument();
    });
  });

  describe('Add Item Functionality', () => {
    it('should add a new item when form is submitted', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Wait for items to load
      await waitFor(() => {
        expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
      });
      
      // Fill in the form
      const input = screen.getByLabelText('Item Name');
      await user.type(input, 'New Test Item');
      
      // Submit the form
      const addButton = screen.getByRole('button', { name: /add item/i });
      await user.click(addButton);
      
      // Check if new item is added to the list
      await waitFor(() => {
        expect(screen.getByText('New Test Item')).toBeInTheDocument();
      });
      
      // Input should be cleared after submission
      expect(input).toHaveValue('');
    });

    it('should disable the Add Item button when input is empty', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Wait for items to load
      await waitFor(() => {
        expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
      });
      
      // Check if button is initially disabled
      const addButton = screen.getByRole('button', { name: /add item/i });
      expect(addButton).toBeDisabled();
      
      // Fill in the form
      const input = screen.getByLabelText('Item Name');
      await user.type(input, 'Test');
      
      // Button should be enabled
      expect(addButton).toBeEnabled();
      
      // Clear the input
      await user.clear(input);
      
      // Button should be disabled again
      expect(addButton).toBeDisabled();
    });

    it('should handle errors when adding a new item', async () => {
      // Override the server response for this test only
      server.use(
        rest.post('/api/items', (req, res, ctx) => {
          return res(ctx.status(400), ctx.json({ error: 'Invalid item name' }));
        })
      );
      
      const user = userEvent.setup();
      render(<App />);
      
      // Wait for items to load
      await waitFor(() => {
        expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
      });
      
      // Fill in the form
      const input = screen.getByLabelText('Item Name');
      await user.type(input, 'Will Fail');
      
      // Submit the form
      const addButton = screen.getByRole('button', { name: /add item/i });
      await user.click(addButton);
      
      // Check if error message is displayed
      await waitFor(() => {
        expect(screen.getByText(/Error adding item/)).toBeInTheDocument();
      });
    });
  });
  describe('Delete Functionality', () => {
    it('should render delete buttons for each item', async () => {
      render(<App />);
      
      // Wait for items to load
      await waitFor(() => {
        expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
      });
      
      // Check if delete buttons are rendered
      const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
      expect(deleteButtons).toHaveLength(mockItems.length);
    });
    
    it('should delete an item when delete button is clicked', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Wait for items to load
      await waitFor(() => {
        expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
      });
      
      // Get the count of items before deletion
      const initialRows = screen.getAllByRole('row');
      const initialRowCount = initialRows.length;
      
      // Get the first delete button
      const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
      
      // Click the delete button
      await user.click(deleteButton);
      
      // Verify that item was deleted (row count should decrease by 1)
      await waitFor(() => {
        const updatedRows = screen.getAllByRole('row');
        expect(updatedRows.length).toBe(initialRowCount - 1);
      });
    });
    
    it('should show error message when delete request fails', async () => {
      const user = userEvent.setup();
      
      // Override the server response for this test only
      server.use(
        rest.delete('/api/items/:id', (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ error: 'Failed to delete item' }));
        })
      );
      
      render(<App />);
      
      // Wait for items to load
      await waitFor(() => {
        expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
      });
      
      // Get the first delete button
      const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
      
      // Click the delete button
      await user.click(deleteButton);
      
      // Check if error message is displayed
      await waitFor(() => {
        expect(screen.getByText(/Error deleting item/)).toBeInTheDocument();
      });
    });
    
    it('should handle 404 not found error when deleting non-existent item', async () => {
      const user = userEvent.setup();
      
      // Set up the server to return a 404 for a specific ID
      server.use(
        rest.delete('/api/items/1', (req, res, ctx) => {
          return res(ctx.status(404), ctx.json({ error: 'Item not found' }));
        })
      );
      
      render(<App />);
      
      // Wait for items to load
      await waitFor(() => {
        expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
      });
      
      // Get the first delete button (which corresponds to ID 1)
      const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
      
      // Click the delete button
      await user.click(deleteButton);
      
      // Check if error message is displayed
      await waitFor(() => {
        expect(screen.getByText(/Error deleting item/)).toBeInTheDocument();
      });
    });
    
    it('should show specific error message when trying to delete an item less than 5 days old', async () => {
      const user = userEvent.setup();
      
      // Set up the server to return a 403 for a specific ID
      server.use(
        rest.delete('/api/items/1', (req, res, ctx) => {
          return res(ctx.status(403), ctx.json({ 
            error: 'Cannot delete items newer than 5 days',
            itemAge: 3
          }));
        })
      );
      
      render(<App />);
      
      // Wait for items to load
      await waitFor(() => {
        expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
      });
      
      // Get the first delete button (which corresponds to ID 1)
      const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
      
      // Click the delete button
      await user.click(deleteButton);
      
      // Check if specific error message about item age is displayed
      await waitFor(() => {
        expect(screen.getByText(/Item is too new \(3 days old\). Items must be at least 5 days old to delete./)).toBeInTheDocument();
      });
    });
  });
});
