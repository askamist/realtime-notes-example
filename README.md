# RealTime Notes App

A modern, real-time note-taking application built with React, TypeScript, and Firebase. Features include user authentication, real-time updates, and note sharing capabilities.

## Features

- 🔐 User Authentication (Email/Password)
- 📝 Create, Read, Update, Delete Notes
- 🌓 Dark/Light Theme Support
- 🔄 Real-time Updates
- 🤝 Note Sharing Capabilities
- 🔍 Search Functionality
- 📱 Responsive Design

## Tech Stack

- React + TypeScript
- Vite
- Firebase (Authentication + Firestore)
- Shadcn/ui Components
- Tailwind CSS

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- Git

## Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication and Firestore in your project
3. Add a new Web App to your Firebase project
4. Copy your Firebase configuration

## Clerk Setup

1. Create a new Clerk application at [Clerk Dashboard](https://dashboard.clerk.dev)
2. Copy your Publishable Key
3. Add it to your `.env` file:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Key changes made:
1. Removed Firebase authentication
2. Added Clerk authentication
3. Updated components to use Clerk's hooks and components
4. Added Clerk's UserButton for profile management
5. Simplified auth state management
6. Updated user identification in notes

Benefits of using Clerk:
1. More robust authentication out of the box
2. Built-in UI components
3. Social login support
4. Better security features
5. User management dashboard

Would you like me to:
1. Add social login providers?
2. Customize Clerk's appearance further?
3. Add protected routes?
4. Add user profile management?

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd firebase-notes-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Update the Firebase configuration in `src/firebase/config.ts`:
```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

5. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── ResetPasswordModal.tsx
│   ├── notes/
│   │   ├── NewNoteModal.tsx
│   │   ├── NoteCard.tsx
│   │   ├── NotesContainer.tsx
│   │   ├── NotesGrid.tsx
│   │   └── Sidebar.tsx
│   ├── layout/
│   │   └── Navbar.tsx
│   └── theme/
│       └── theme-provider.tsx
├── firebase/
│   ├── config.ts
│   └── notes.ts
├── hooks/
│   └── useAuth.ts
└── App.tsx
```

## Features Explanation

### Authentication
- Users can sign up with email and password
- Login with existing credentials
- Password reset functionality
- Profile management

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

## Usage

1. Sign up for a new account or log in with existing credentials
2. Create a new note using the "+ New Note" button
3. View your notes in the grid layout
4. Edit or delete notes using the buttons on each note card
5. Share notes with other users using their email
6. Toggle between personal and shared notes using the sidebar
7. Search through your notes using the search bar

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.
