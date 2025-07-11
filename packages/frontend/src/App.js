import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/items');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data: ' + err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!newItem.trim()) return;

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newItem }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      const result = await response.json();
      setData([...data, result]);
      setNewItem('');
    } catch (err) {
      setError('Error adding item: ' + err.message);
      console.error('Error adding item:', err);
    }
  };

  const handleDelete = async id => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        if (response.status === 403) {
          throw new Error(`Item is too new (${errorData.itemAge} days old). Items must be at least 5 days old to delete.`);
        }
        
        throw new Error(errorData.error || 'Failed to delete item');
      }

      // Remove the deleted item from the state
      setData(data.filter(item => item.id !== id));
      setError(null);
    } catch (err) {
      setError('Error deleting item: ' + err.message);
      console.error('Error deleting item:', err);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper
        elevation={3}
        sx={{
          bgcolor: '#282c34',
          color: 'white',
          p: 3,
          borderRadius: 2,
          mb: 3,
          textAlign: 'center',
        }}
      >
        <h1>Hello World</h1>
        <p>Connected to in-memory database</p>
      </Paper>

      <main>
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <h2>Add New Item</h2>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={newItem}
              onChange={e => setNewItem(e.target.value)}
              placeholder="Enter item name"
              label="Item Name"
            />
            <Button type="submit" variant="contained" color="primary" disabled={!newItem.trim()}>
              Add Item
            </Button>
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <h2>Items from Database</h2>
          {loading && <p>Loading data...</p>}
          {error && <p className="error">{error}</p>}
          {!loading &&
            !error &&
            (data.length > 0 ? (
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table aria-label="items table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map(item => (
                      <TableRow key={item.id}>
                        <TableCell align="center">{item.id}</TableCell>
                        <TableCell align="center">{item.name}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => handleDelete(item.id)}
                            aria-label={`Delete ${item.name}`}
                            color="error"
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <p>No items found. Add some!</p>
            ))}
        </Paper>
      </main>
    </Box>
  );
}

export default App;
