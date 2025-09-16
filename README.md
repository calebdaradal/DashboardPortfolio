# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Administrator Dashboard

A comprehensive administrator dashboard built with React, Vite, and Tailwind CSS.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Sidebar, Header, etc.)
│   ├── ui/             # Basic UI components (Button, Card, etc.)
│   └── forms/          # Form components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── stores/             # Zustand stores
├── services/           # API services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── assets/             # Static assets
    ├── icons/          # Icon assets
    └── images/         # Image assets
```

## Features

- 🔐 Authentication system with role-based access
- 📊 Analytics dashboard with real-time data
- 👥 User management with CRUD operations
- 📦 Product management with inventory tracking
- 🎨 Enterprise-grade design system
- 📱 Fully responsive design
- 🔍 Advanced search and filtering
- 📈 Interactive charts and visualizations

## Technology Stack

- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Notifications**: React Hot Toast

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Development Guidelines

- Follow the established component structure
- Use TypeScript for type safety
- Follow the design system guidelines
- Write unit tests for components and hooks
- Use ESLint and Prettier for code formatting

## License

MIT License
