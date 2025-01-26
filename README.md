# RealTime Notes App

A modern, real-time note-taking application built with React, TypeScript, and Clerk Authentication. Features include user authentication, real-time updates, and note sharing capabilities.

## Features

- 🔐 Secure Authentication with Clerk
- 📝 Create, Read, Update, Delete Notes
- 🌓 Dark/Light Theme Support
- 🔄 Real-time Updates
- 🤝 Note Sharing Capabilities
- 🔍 Search Functionality
- 📱 Responsive Design

## Tech Stack

- React + TypeScript
- Vite
- Clerk Authentication
- Shadcn/ui Components
- Tailwind CSS
- pnpm (Package Manager)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- pnpm (v8 or higher)
- Git

## Clerk Setup

1. Create a new Clerk application at [Clerk Dashboard](https://dashboard.clerk.dev)
2. Copy your Publishable Key
3. Create a `.env` file in `apps/web/` directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd realtime-notes-app
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

## Available Scripts

From the root directory:

```bash
pnpm dev        # Start development server
pnpm build      # Build all packages and apps
pnpm lint       # Run linting
pnpm clean      # Clean all builds
pnpm format     # Format code with Prettier
```

## Workspace Structure

### Apps

- `web`: Main React application
  - Contains the core note-taking functionality
  - Handles user interface and interactions
  - Manages authentication flow

### Packages

- `ui`: Shared UI components
  - Contains reusable UI components
  - Built with shadcn/ui and Tailwind CSS
  - Includes theme support

- `tsconfig`: Shared TypeScript configurations
  - Base TypeScript configuration
  - React-specific configuration
  - Ensures consistency across packages

## Features Explanation

### Authentication
- Secure sign-up and login with Clerk
- Social authentication providers (optional)
- Password reset functionality
- Profile management through Clerk User Profile
- Protected routes and sessions

### Notes Management
- Create new notes with title and content
- View all personal notes in a grid layout
- Edit existing notes
- Delete notes
- Share notes with other users
- Real-time updates when notes change

### Theme Support
- Toggle between light and dark themes
- System preference detection
- Theme persistence

## Development

To add new features or modify existing ones:

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit them:
```bash
git add .
git commit -m "Add your feature description"
```

3. Push to your branch:
```bash
git push origin feature/your-feature-name
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Troubleshooting

Common issues and solutions:

1. **Build Errors**
   ```bash
   pnpm clean && pnpm install
   ```

2. **Cache Issues**
   ```bash
   pnpm clean
   ```

3. **Dependency Issues**
   ```bash
   pnpm install --force
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
