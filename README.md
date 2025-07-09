# Jarida - Personal Journal Application

A modern, feature-rich personal journal application built with React, TypeScript, and Convex. Jarida provides a secure and intuitive platform for creating, organizing, and managing your personal journal entries with rich text editing capabilities.

## 🚀 Features

- **Rich Text Editor**: Powered by Plate.js with advanced formatting options
- **Tag System**: Organize entries with custom tags for easy filtering
- **Real-time Sync**: Built on Convex for instant data synchronization
- **Authentication**: Secure user authentication with Clerk
- **Responsive Design**: Mobile-first design that works on all devices
- **Media Support**: Embed images, videos, and audio in your entries
- **Search & Filter**: Find entries quickly with tag-based filtering
- **Modern UI**: Clean, accessible interface built with Radix UI and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, TanStack Router, TanStack Form
- **Backend**: Convex (real-time database and backend)
- **Authentication**: Clerk
- **Styling**: Tailwind CSS, Radix UI components
- **Rich Text**: Plate.js editor with extensive plugins
- **Build Tool**: Vite
- **Package Manager**: Bun

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jarida
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_CONVEX_URL=your_convex_url
   ```

4. **Set up Convex**
   ```bash
   npx convex dev
   ```

## 🚀 Development

To start the development server:

```bash
bun run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Build

To build for production:

```bash
bun run build
```

## 📁 Project Structure

```
jarida/
├── src/
│   ├── app/                 # App configuration
│   ├── components/          # Reusable UI components
│   │   ├── journal/        # Journal-specific components
│   │   └── ui/             # Base UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── routes/             # Application routes
│   │   └── _protected/     # Protected routes
│   │       └── journal/    # Journal feature routes
│   └── schemas/            # Zod validation schemas
├── convex/                 # Convex backend functions
│   ├── entries.ts          # Journal entries logic
│   ├── tags.ts             # Tags management
│   └── schema.ts           # Database schema
└── public/                 # Static assets
```

## 🎯 Key Features

### Journal Management
- Create, edit, and delete journal entries
- Rich text editing with Plate.js
- Tag-based organization system
- Real-time synchronization across devices

### User Experience
- Responsive design for mobile and desktop
- Intuitive navigation with TanStack Router
- Form validation with TanStack Form
- Accessible UI components with Radix UI

### Data Management
- Real-time database with Convex
- Secure authentication with Clerk
- Optimistic updates for better UX
- Offline-capable architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [TanStack](https://tanstack.com/) for excellent React libraries
- [Convex](https://convex.dev/) for the real-time backend
- [Plate.js](https://platejs.org/) for the rich text editor
- [Clerk](https://clerk.com/) for authentication
- [Radix UI](https://www.radix-ui.com/) for accessible components
