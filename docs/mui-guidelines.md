# Material-UI (MUI) Guidelines

This document outlines the guidelines and best practices for using Material-UI (MUI) components in this project.

## Overview

Material-UI is a React component library that implements Google's Material Design. It provides a comprehensive set of UI components and styling utilities to create consistent, accessible, and beautiful user interfaces.

## Installation

To add MUI to the project:

```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material  # For Material Design icons
npm install @mui/lab  # For experimental components (optional)
```

## Core Principles

### 1. Consistency

- Use MUI components consistently throughout the application
- Stick to the Material Design principles and patterns
- Maintain consistent spacing using MUI's spacing system
- Use the theme consistently for colors, typography, and breakpoints

### 2. Accessibility

- MUI components come with built-in accessibility features
- Always provide proper labels and descriptions for form elements
- Use semantic HTML elements and ARIA attributes where appropriate
- Test with screen readers and keyboard navigation

### 3. Performance

- Import components individually to reduce bundle size
- Use tree shaking to eliminate unused components
- Consider lazy loading for large component sets
- Optimize theme usage to avoid unnecessary re-renders

## Theme Configuration

### Setting Up a Custom Theme

Create a theme configuration file to customize MUI's default theme:

```javascript
// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
  },
  spacing: 8, // Base spacing unit (8px)
  shape: {
    borderRadius: 8,
  },
});

export default theme;
```

### Using the Theme Provider

Wrap your application with the ThemeProvider:

```javascript
// src/App.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Your app components */}
    </ThemeProvider>
  );
}

export default App;
```

## Component Usage Guidelines

### Import Best Practices

Import components individually for better tree shaking:

```javascript
// Good - Individual imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

// Avoid - Barrel imports (increases bundle size)
import { Button, TextField, Box } from '@mui/material';
```

### Layout Components

#### Box Component

Use Box for layout and spacing:

```javascript
import Box from '@mui/material/Box';

function MyComponent() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2, // Uses theme spacing (2 * 8px = 16px)
        p: 3,   // Padding
        m: 2,   // Margin
      }}
    >
      {/* Content */}
    </Box>
  );
}
```

#### Grid System

Use the Grid component for responsive layouts:

```javascript
import Grid from '@mui/material/Grid';

function ResponsiveLayout() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {/* Content */}
      </Grid>
      <Grid item xs={12} md={6}>
        {/* Content */}
      </Grid>
    </Grid>
  );
}
```

### Form Components

#### Text Fields

Use TextField for form inputs:

```javascript
import TextField from '@mui/material/TextField';

function MyForm() {
  return (
    <TextField
      label="Email"
      type="email"
      variant="outlined"
      fullWidth
      required
      helperText="Enter your email address"
      error={hasError}
    />
  );
}
```

#### Buttons

Use Button component with appropriate variants:

```javascript
import Button from '@mui/material/Button';

function ActionButtons() {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button variant="contained" color="primary">
        Primary Action
      </Button>
      <Button variant="outlined" color="secondary">
        Secondary Action
      </Button>
      <Button variant="text">
        Text Button
      </Button>
    </Box>
  );
}
```

### Data Display Components

#### Tables

Use Table components for data display:

```javascript
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

function DataTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                {/* Action buttons */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
```

## Styling Guidelines

### Using the sx Prop

Prefer the `sx` prop for component-specific styling:

```javascript
import Box from '@mui/material/Box';

function StyledComponent() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        p: 2,
        borderRadius: 1,
        '&:hover': {
          backgroundColor: 'primary.dark',
        },
      }}
    >
      Content
    </Box>
  );
}
```

### Custom Styled Components

For reusable styled components, use the `styled` utility:

```javascript
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));
```

### Responsive Design

Use theme breakpoints for responsive design:

```javascript
import Box from '@mui/material/Box';

function ResponsiveComponent() {
  return (
    <Box
      sx={{
        fontSize: {
          xs: '0.875rem',  // Mobile
          sm: '1rem',      // Tablet
          md: '1.125rem',  // Desktop
        },
        p: {
          xs: 1,
          md: 3,
        },
      }}
    >
      Responsive content
    </Box>
  );
}
```

## Component Organization

### Creating Reusable Components

Organize MUI-based components following the project structure:

```javascript
// src/components/common/CustomButton.js
import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  textTransform: 'none',
  fontWeight: 600,
}));

/**
 * Custom button component with project-specific styling.
 */
function CustomButton({ children, ...props }) {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  );
}

export default CustomButton;
```

### Component Props and Documentation

Document MUI component props using JSDoc:

```javascript
/**
 * User card component displaying user information.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.user - User object with name, email, etc.
 * @param {boolean} props.showActions - Whether to show action buttons
 * @param {function} props.onEdit - Callback when edit button is clicked
 * @param {function} props.onDelete - Callback when delete button is clicked
 */
function UserCard({ user, showActions = true, onEdit, onDelete }) {
  // Implementation
}
```

## Testing MUI Components

### Testing with React Testing Library

Test MUI components focusing on user interactions:

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import MyComponent from './MyComponent';

// Helper to render with theme
function renderWithTheme(component) {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
}

describe('MyComponent', () => {
  it('should render button and handle click', () => {
    const handleClick = jest.fn();
    
    renderWithTheme(<MyComponent onClick={handleClick} />);
    
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Performance Best Practices

### Bundle Size Optimization

1. Use individual imports instead of barrel imports
2. Configure webpack for better tree shaking
3. Consider using @mui/material/styles for styling utilities only when needed

### Runtime Performance

1. Avoid creating theme objects in render functions
2. Use React.memo for pure MUI components when appropriate
3. Minimize sx prop complexity for frequently re-rendered components

## Migration from Custom CSS

When migrating from custom CSS to MUI:

1. Replace custom styled elements with equivalent MUI components
2. Move custom styles to theme configuration where appropriate
3. Use MUI's spacing and color system instead of hardcoded values
4. Replace custom responsive breakpoints with MUI's breakpoint system

## Common Patterns

### Loading States

```javascript
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function LoadingButton({ loading, children, ...props }) {
  return (
    <Button disabled={loading} {...props}>
      {loading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CircularProgress size={16} />
          Loading...
        </Box>
      ) : (
        children
      )}
    </Button>
  );
}
```

### Error States

```javascript
import Alert from '@mui/material/Alert';

function ErrorMessage({ error, onDismiss }) {
  if (!error) return null;
  
  return (
    <Alert 
      severity="error" 
      onClose={onDismiss}
      sx={{ mb: 2 }}
    >
      {error.message}
    </Alert>
  );
}
```

### Form Validation

```javascript
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';

function ValidatedTextField({ error, helperText, ...props }) {
  return (
    <>
      <TextField
        error={!!error}
        helperText={error || helperText}
        {...props}
      />
    </>
  );
}
```

## Resources

- [MUI Documentation](https://mui.com/)
- [Material Design Guidelines](https://material.io/design)
- [MUI System Documentation](https://mui.com/system/basics/)
- [MUI Theming Guide](https://mui.com/customization/theming/)
