# Material UI (MUI) Guidelines

This document outlines the guidelines and best practices for using Material UI (MUI) in this project.

## Overview

Material UI is a popular React UI framework that implements Google's Material Design principles. It provides a comprehensive suite of UI tools to create beautiful, responsive, and consistent user interfaces.

## Installation

The project uses Material UI v5. The following core packages are included:

- `@mui/material`: Core components
- `@mui/icons-material`: Material Design icons
- `@emotion/react` and `@emotion/styled`: Required for styling MUI components
- `@mui/system`: For advanced styling capabilities

## Component Usage

### Basic Principles

- Use MUI components instead of custom HTML/CSS when possible
- Leverage the theme for consistent styling
- Use MUI's built-in responsive design capabilities
- Follow the MUI component documentation for props and proper usage

### Preferred Components

Prefer using these MUI components instead of their HTML equivalents:

| HTML Element | MUI Component | Notes |
|--------------|--------------|-------|
| `<button>` | `<Button>` | Use variant="contained" for primary actions, "outlined" for secondary |
| `<input>`, `<select>` | `<TextField>`, `<Select>` | Provides consistent styling and behavior |
| `<table>` | `<TableContainer>`, `<Table>`, etc. | Use the full suite of Table components |
| `<ul>`, `<li>` | `<List>`, `<ListItem>` | For navigation or simple lists |
| `<div>` with flex | `<Stack>`, `<Grid>` | For layout management |

### Layout Guidelines

- Use `<Container>` as the main wrapper for content
- Use `<Grid>` system for complex layouts
- Use `<Stack>` for simpler one-dimensional layouts
- Use `<Box>` for custom styling when other components don't fit

## Theming

### Theme Structure

The project uses a custom theme that extends MUI's default theme. The theme includes:

- Custom color palette aligned with our brand
- Typography settings
- Component default props and style overrides
- Responsive breakpoints

### Using the Theme

Access the theme using the `useTheme` hook:

```jsx
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      backgroundColor: theme.palette.primary.main,
      padding: theme.spacing(2)
    }}>
      Content
    </Box>
  );
}
```

### Colors

Use the theme's color palette rather than hardcoded colors:

- `primary`: Main brand color
- `secondary`: Complementary color
- `error`, `warning`, `info`, `success`: Status colors
- `text.primary`, `text.secondary`: Text colors
- `background.default`, `background.paper`: Background colors

## Styling

### Preferred Method: The `sx` Prop

The recommended way to style MUI components is using the `sx` prop:

```jsx
<Box
  sx={{
    p: 2, // padding: theme.spacing(2)
    bgcolor: 'background.paper',
    borderRadius: 1,
    display: 'flex',
    gap: 2
  }}
>
  Content
</Box>
```

### Custom Components with Styled API

For reusable styled components, use the styled API:

```jsx
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CustomButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  borderRadius: theme.shape.borderRadius * 2,
  '&:hover': {
    backgroundColor: theme.palette.secondary.light,
  },
}));
```

## Responsive Design

- Use the theme's breakpoints for responsive designs
- Leverage MUI's built-in responsive props (e.g., the `Grid` component's props)
- Use the `useMediaQuery` hook for conditional rendering based on screen size

Example:

```jsx
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function ResponsiveComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box sx={{ 
      flexDirection: isMobile ? 'column' : 'row',
      // Other styles
    }}>
      Content
    </Box>
  );
}
```

## Performance Considerations

- Use `React.memo` for components that render frequently but with the same props
- Implement virtualization for long lists using `react-window` with MUI
- Split larger MUI imports for better bundle size:
  ```jsx
  // Good
  import Button from '@mui/material/Button';
  
  // Avoid in production code
  import { Button } from '@mui/material';
  ```

## Accessibility

- Ensure proper contrast ratios using theme colors
- Maintain keyboard navigation support
- Use appropriate ARIA attributes when necessary
- Test with screen readers
- Follow MUI's accessibility guidelines

## Testing MUI Components

When testing MUI components:

- Use `@testing-library/react` with appropriate queries
- Test component interactions, not implementation details
- Mock theme providers in test files
- Test responsive behavior by resizing the viewport in tests

## Additional Resources

- [MUI Official Documentation](https://mui.com/)
- [MUI GitHub Repository](https://github.com/mui/material-ui)
- [MUI System Documentation](https://mui.com/system/getting-started/)
