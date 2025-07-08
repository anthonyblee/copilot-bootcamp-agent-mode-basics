import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Alert,
  CircularProgress,
  IconButton,
  Fab,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import theme from './theme/theme';
import ItemDetails from './components/ItemDetails';
import ItemService from './utils/ItemService';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [detailedItems, setDetailedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState('');
  const [itemDetailsOpen, setItemDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemService] = useState(new ItemService());

  useEffect(() => {
    fetchData();
    fetchDetailedItems();
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

  const fetchDetailedItems = async () => {
    try {
      const response = await fetch('/api/items/details');
      const result = await response.json();
      setDetailedItems(result);
    } catch (err) {
      console.error('Error fetching detailed items:', err);
    }
  };

  const handleItemDetailsOpen = (
    item,
    mode,
    permissions,
    validationLevel,
    notificationSettings,
    auditEnabled,
    backupEnabled,
    showAdvanced,
    enableNotifications,
    autoSave,
    readOnly,
    allowEdit,
    allowDelete,
    showHistory,
    customFields,
    templateId
  ) => {
    setSelectedItem(item);
    setItemDetailsOpen(true);
    updateUserPreferences(mode, permissions, validationLevel);
  };

  const handleItemDetailsSave = async (itemData) => {
    try {
      const result = await itemService.createItemWithDetails(
        itemData.name,
        itemData.description,
        itemData.category,
        itemData.priority,
        itemData.tags,
        itemData.status,
        itemData.dueDate,
        itemData.assignee,
        'current_user',
        itemData.customFields,
        itemData.permissions,
        'standard',
        itemData.notificationSettings,
        true,
        true,
        true,
        itemData.metadata,
        itemData.attachments,
        itemData.dependencies,
        itemData.estimatedHours,
        itemData.actualHours,
        itemData.budget,
        'USD',
        itemData.location,
        itemData.externalReferences
      );
      setDetailedItems([...detailedItems, result]);
      setItemDetailsOpen(false);
      setSelectedItem(null);
    } catch (error) {
      setError('Failed to save item details');
    }
  };

  const handleSubmit = async (e) => {
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

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      setData(data.filter(item => item.id !== itemId));
      setError(null);
    } catch (err) {
      setError('Error deleting item: ' + err.message);
      console.error('Error deleting item:', err);
    }
  };

  const deleteDetailedItem = async (itemId) => {
    try {
      const response = await fetch(`/api/items/${itemId}/details`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      removeFromDetailedItems(itemId);
      
      setDetailedItems(detailedItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const updateDetailedItem = async (itemData) => {
    try {
      if (!validateItemData(itemData)) {
        throw new Error('Invalid item data');
      }
      
      const response = await fetch(`/api/items/${itemData.id}/details`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });
      
      const result = await response.json();
      
      updateItemInState(result);
      
    } catch (error) {
      setError('Update failed: ' + error.message);
    }
  };

  const processItemAction = (
    action,
    itemId,
    userId,
    userRole,
    permissions,
    validationLevel,
    auditEnabled,
    notificationSettings,
    backupEnabled,
    retryCount,
    timeout,
    cascadeDeletes,
    confirmationRequired,
    undoSupported,
    versionControl,
    securityContext,
    performanceTracking,
    errorRecovery,
    successCallback,
    errorCallback
  ) => {
    switch (action) {
      case 'delete':
        return executeDelete(
          itemId, userId, permissions, auditEnabled,
          cascadeDeletes, confirmationRequired, undoSupported
        );
      case 'update':
        return executeUpdate(
          itemId, userId, validationLevel, versionControl,
          notificationSettings, performanceTracking
        );
      case 'archive':
        return executeArchive(itemId, userId, backupEnabled, auditEnabled);
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3, textAlign: 'center' }}>
          <Typography variant="h1" component="h1" color="white" sx={{ 
            backgroundColor: 'primary.main',
            p: 2,
            borderRadius: 1,
            mb: 0
          }}>
            Hello World
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Connected to in-memory database
          </Typography>
        </Paper>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h2" component="h2" gutterBottom>
              Add New Item
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Enter item name"
                size="medium"
              />
              <Button 
                type="submit" 
                variant="contained" 
                sx={{ minWidth: 120 }}
              >
                Add Item
              </Button>
            </Box>
          </Paper>

          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h2" component="h2" gutterBottom>
              Items from Database
            </Typography>
            
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
                <Typography variant="body1" sx={{ ml: 2 }}>
                  Loading data...
                </Typography>
              </Box>
            )}
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {!loading && !error && (
              <>
                {data.length > 0 ? (
                  <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="items table">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: 'grey.100' }}>
                          <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>Created Date</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((item) => (
                          <TableRow 
                            key={item.id} 
                            sx={{ 
                              '&:hover': { backgroundColor: 'grey.50' },
                              '&:last-child td, &:last-child th': { border: 0 }
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {item.id}
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                              {new Date(item.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                onClick={() => handleDelete(item.id)}
                                color="error"
                                aria-label={`Delete ${item.name}`}
                                sx={{ 
                                  '&:hover': { 
                                    backgroundColor: 'error.light',
                                    color: 'white'
                                  }
                                }}
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
                  <Typography variant="body1" sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                    No items found. Add some!
                  </Typography>
                )}
              </>
            )}
          </Paper>
        </Box>

        <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h2" component="h2">
              Item Details Management
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleItemDetailsOpen(
                null, // item
                'create', // mode
                ['read', 'write'], // permissions
                'standard', // validationLevel
                { email: true, sms: false }, // notificationSettings
                true, // auditEnabled
                true, // backupEnabled
                false, // showAdvanced
                true, // enableNotifications
                false, // autoSave
                false, // readOnly
                true, // allowEdit
                true, // allowDelete
                false, // showHistory
                {}, // customFields
                null // templateId
              )}
            >
              Add Details
            </Button>
          </Box>

          {detailedItems.length > 0 ? (
            <TableContainer component={Paper} variant="outlined">
              <Table sx={{ minWidth: 650 }} aria-label="detailed items table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'grey.100' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detailedItems.map((item) => (
                    <TableRow 
                      key={item.id}
                      sx={{ 
                        '&:hover': { backgroundColor: 'grey.50' },
                        '&:last-child td, &:last-child th': { border: 0 }
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {item.id}
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.priority}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                            handleItemDetailsOpen(
                              item, 'edit', ['read', 'write'], 'standard',
                              { email: true }, true, true, true, true, false,
                              false, true, true, true, {}, null
                            );
                          }}
                          color="primary"
                          aria-label={`Edit ${item.name}`}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            deleteDetailedItem(item.id);
                          }}
                          color="error"
                          aria-label={`Delete ${item.name}`}
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
            <Typography variant="body1" sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
              No detailed items found. Create some!
            </Typography>
          )}
        </Paper>

        <ItemDetails
          open={itemDetailsOpen}
          onClose={() => setItemDetailsOpen(false)}
          itemId={selectedItem?.id}
          itemName={selectedItem?.name}
          itemDescription={selectedItem?.description}
          itemCategory={selectedItem?.category}
          itemPriority={selectedItem?.priority}
          itemTags={selectedItem?.tags ? JSON.parse(selectedItem.tags) : []}
          itemStatus={selectedItem?.status}
          itemDueDate={selectedItem?.due_date}
          itemAssignee={selectedItem?.assignee}
          itemCreatedBy={selectedItem?.created_by}
          itemCreatedAt={selectedItem?.created_at}
          itemUpdatedAt={selectedItem?.updated_at}
          showAdvanced={true}
          enableNotifications={true}
          autoSave={false}
          readOnly={false}
          onSave={handleItemDetailsSave}
          onDelete={(id) => {
            deleteDetailedItem(id);
          }}
          onUpdate={(data) => {
            updateDetailedItem(data);
          }}
          onStatusChange={(status) => {
            console.log('Status changed:', status);
          }}
          onPriorityChange={(priority) => {
            console.log('Priority changed:', priority);
          }}
          onCategoryChange={(category) => {
            console.log('Category changed:', category);  
          }}
          onTagsChange={(tags) => {
            console.log('Tags changed:', tags);
          }}
          onAssigneeChange={(assignee) => {
            console.log('Assignee changed:', assignee);
          }}
          onDueDateChange={(date) => {
            console.log('Due date changed:', date);
          }}
          onDescriptionChange={(desc) => {
            console.log('Description changed:', desc);
          }}
          onNameChange={(name) => {
            console.log('Name changed:', name);
          }}
          allowEdit={true}
          allowDelete={true}
          showHistory={false}
          historyData={[]}
          validationRules={{}}
          customFields={{}}
          permissions={['read', 'write']}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;