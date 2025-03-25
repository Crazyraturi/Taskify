# Taskify - Modern Task Management Web Application

Taskify is a feature-rich task management web application built with React, TypeScript, and Vite. It offers a sleek user interface, task prioritization, weather integration, and more.

![Taskify Screenshot](https://i.imgur.com/example.png) <!-- Replace with actual screenshot when available -->

## Features

- **User Authentication**: Secure signup, login, and logout functionality
- **Task Management**: Create, read, update, and delete tasks
- **Task Prioritization**: Set priority levels (high, medium, low) for tasks
- **Due Dates**: Add due dates to tasks for better time management
- **Location & Weather Integration**: Add locations to tasks and view real-time weather data
- **Data Persistence**: Tasks are stored locally using browser localStorage
- **Responsive Design**: Beautiful, mobile-friendly interface
- **Visual Feedback**: Animations and toast notifications for user actions

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite
- **UI Animation**: Framer Motion
- **Date Handling**: date-fns
- **Form Management**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Toast Notifications**: Sonner

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher) or yarn (v1.22.0 or higher)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/taskify.git
cd taskify
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Create a .env file for environment variables**

```
# .env
VITE_WEATHER_API_KEY=your_weatherapi_com_api_key
```

Note: The app currently uses a demo API key, but for production, you should obtain your own API key from [WeatherAPI.com](https://www.weatherapi.com).

4. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open the application**

Navigate to `http://localhost:5173` in your browser.

## Building for Production

To create a production-ready build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
taskify/
├── public/              # Static assets
│   ├── components/      # Reusable UI components
│   │   ├── Tasks/       # Task-related components
│   │   └── ui/          # UI component library
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── store/           # Redux store configuration
│   │   └── slices/      # Redux slice files
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Application entry point
├── .env                 # Environment variables
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Key Features & Usage

### Authentication

- **Sign Up**: Create a new account with email and password
- **Login**: Access your tasks with your account credentials
- **Logout**: Securely log out of your account

### Task Management

- **Create Tasks**: Add new tasks with a title, description, priority, due date, and location
- **Edit Tasks**: Update existing tasks
- **Complete Tasks**: Mark tasks as completed with a checkbox
- **Delete Tasks**: Remove unwanted tasks
- **Prioritize**: Set task priority as high, medium, or low
- **Weather Integration**: Tasks with locations will display current weather conditions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [WeatherAPI.com](https://www.weatherapi.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

Made with ❤️ by Subodh raturi
