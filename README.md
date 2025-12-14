# TaskFlow Harmony

A modern, intuitive task management system built with React and TypeScript. Organize your work, track progress, and boost productivity with a clean, responsive interface.

## Features

- ✅ **Task Management** - Create, edit, delete, and organize tasks
- 🏷️ **Categories** - Organize tasks with custom categories and colors
- 🎯 **Priority Levels** - Set task priorities (low, medium, high)
- 📊 **Status Tracking** - Track progress (todo, in-progress, completed)
- 🔍 **Search & Filter** - Find tasks quickly with powerful filtering
- 🌙 **Dark/Light Theme** - Toggle between themes for comfortable viewing
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 💾 **Local Storage** - Your data persists locally in your browser

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd taskflow-harmony
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
taskflow-harmony/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts for state management
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── types/          # TypeScript type definitions
│   └── lib/            # Utility functions
├── public/             # Static assets
└── ...config files
```

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Data Fetching**: TanStack Query
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Themes**: next-themes for dark/light mode

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
