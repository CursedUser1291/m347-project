# Desktop Frontend Template with Joy UI

This is a desktop-optimized React TypeScript (TSX) frontend template using Joy UI components to help you get started with your project. The template is designed with a desktop-first approach, providing an optimal experience for larger screens.

## Project Structure

```
frontend/
├── public/             # Static files
├── src/                # Source code
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable components
│   │   └── layout/     # Layout components
│   │       ├── Layout.tsx    # Main layout wrapper
│   │       ├── Header.tsx    # Header component
│   │       └── Footer.tsx    # Footer component
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   │   └── Home/       # Home page
│   │       ├── Home.tsx      # Home page component
│   │       └── Home.css      # Home page styles
│   ├── services/       # API services
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main App component
│   ├── App.css         # Global styles
│   ├── main.tsx        # Entry point
│   └── index.css       # Base styles
└── package.json        # Dependencies and scripts
```

## Components

### Layout Components

- **Layout**: The main layout wrapper that includes the Header, Footer, and main content area.
- **Header**: The top navigation bar with logo, navigation links, and user actions.
- **Footer**: The footer with information, links, and copyright notice.

### Page Components

- **Home**: A sample home page with hero section, features, and call-to-action.

## Styling

The template uses Joy UI components for a consistent and modern UI design. Joy UI is a React component library that provides a set of customizable UI components with a focus on accessibility and user experience.

Each component leverages Joy UI's styling system with the `sx` prop for custom styling, while maintaining some component-specific CSS files for additional styling needs. Global styles are defined in `App.css`.

### Joy UI Features Used:
- `CssVarsProvider` for theming
- `CssBaseline` for consistent base styles
- Layout components: `Box`, `Container`, `Grid`
- Typography components: `Typography`
- Interactive components: `Button`, `Link`
- Navigation components: `List`, `ListItem`, `ListItemButton`
- Surface components: `Card`, `Sheet`
- Utility components: `Divider`

The template maintains a desktop-first approach with the following features:
- Wide container (1400px max-width) for optimal desktop viewing
- Responsive styling using Joy UI's breakpoint system
- Larger font sizes and spacing for desktop screens
- Fixed multi-column layouts for features and footer sections
- Desktop-optimized navigation with horizontal menu
- Fallback styles for smaller screens (applied only below 480px)

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Customization

### Adding New Pages

1. Create a new folder in the `pages` directory
2. Create a TSX file for the component and a CSS file for styles
3. Use the Layout component to wrap your page content

Example:
```tsx
import React from 'react';
import Layout from '../../components/layout/Layout';
import './About.css';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="about-page">
        {/* Your page content here */}
      </div>
    </Layout>
  );
};

export default About;
```

### Adding New Components

1. Create a new folder in the `components` directory
2. Create a TSX file for the component (and optionally a CSS file for additional styles)
3. Use Joy UI components for consistent styling

Example:
```tsx
import React from 'react';
import { Button as JoyButton } from '@mui/joy';
import './CustomButton.css'; // Optional for additional styles

interface CustomButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'solid' | 'soft' | 'outlined' | 'plain';
  color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  text, 
  onClick, 
  variant = 'solid',
  color = 'primary'
}) => {
  return (
    <JoyButton 
      variant={variant}
      color={color}
      onClick={onClick}
      sx={{
        // Custom styling using the sx prop
        px: { xs: 2, md: 3 },
        py: { xs: 1, md: 1.5 },
        fontSize: { xs: '1rem', md: '1.1rem' }
      }}
    >
      {text}
    </JoyButton>
  );
};

export default CustomButton;
```

## Best Practices

- Keep components small and focused on a single responsibility
- Use TypeScript interfaces for props
- Separate business logic from UI components
- Use Joy UI's `sx` prop for component-specific styling
- Leverage Joy UI's theme system for consistent design
- Use Joy UI's responsive breakpoints (`xs`, `sm`, `md`, `lg`, `xl`) for responsive design
- Prefer Joy UI components over custom HTML elements for better accessibility and consistency
- Maintain the desktop-first approach while ensuring components work on smaller screens when needed
- Use Joy UI's theming capabilities for dark mode and custom color schemes
- Extend Joy UI components rather than creating completely custom ones when possible
