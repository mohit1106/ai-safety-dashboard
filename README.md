# AI Safety Incident Dashboard

A modern, interactive dashboard for tracking and reporting AI safety incidents. This project was created as a take-home assignment for an AI Safety startup.

![AI Safety Incident Dashboard Screenshot](https://i.imgur.com/example.png)

## Features

- **Interactive 3D Background** using Three.js for a modern, engaging UI
- **Responsive Design** that works on mobile, tablet, and desktop
- **Persistent Data Storage** using localStorage to maintain incident data between sessions
- **Filter and Sort Functionality** to easily find relevant incidents
- **Search Capability** to quickly locate specific incidents
- **Clean, Modern UI** with smooth animations and transitions
- **Dark Mode Support** for comfortable viewing in different environments
- **Accessibility Features** for inclusive user experience
- **Form Validation** to ensure quality data entry

## Bonus Features

- Interactive 3D models that rotate and animate in the background
- Toast notifications for user feedback
- Expandable incident details with smooth animations
- Dark/Light theme toggle with persistent preference
- Empty state handling with helpful messages
- Loading state with animation

## Technologies Used

- React with TypeScript
- Three.js with React Three Fiber for 3D elements
- Framer Motion for animations
- localStorage for data persistence
- CSS for styling (no UI frameworks used)
- React Icons for iconography

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-safety-dashboard.git
   cd ai-safety-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
src/
├── components/         # UI components
│   ├── Background3D.tsx     # 3D background using Three.js
│   ├── EmptyState.tsx       # Component shown when no incidents match filters
│   ├── FilterControls.tsx   # Filtering and sorting controls
│   ├── IncidentForm.tsx     # Form for reporting new incidents
│   ├── IncidentItem.tsx     # Individual incident card component
│   └── ToastNotification.tsx # Notification component
├── data/               # Mock data
│   └── mockData.ts          # Initial incident data
├── services/           # Service layer
│   └── storageService.ts    # Local storage service for data persistence
├── types/              # TypeScript type definitions
│   └── types.ts             # Common type definitions
├── utils/              # Utility functions
│   ├── dateUtils.ts         # Date formatting utilities
│   └── filterUtils.ts       # Filtering and sorting utilities
├── App.css             # Main application styles
├── App.tsx             # Main application component
├── index.css           # Global styles
└── index.tsx           # Application entry point
```

## Design Decisions

1. **Three.js Integration**: Added 3D elements to create a modern, visually engaging experience without overwhelming the primary functionality.

2. **Component Architecture**: Organized the application into small, reusable components for better maintainability and code organization.

3. **Local Storage**: Used browser's localStorage API for persistence without requiring a backend, making the application self-contained while fulfilling the requirement for data retention.

4. **Dark Mode**: Implemented a theme toggle to improve accessibility and user comfort.

5. **Inline Validation**: Added form validation to ensure data quality and provide immediate feedback to users.

## Future Improvements

- Add user authentication
- Implement incident categories and tagging
- Create data visualization for incident metrics
- Add editing and deletion functionality
- Implement keyboard navigation for better accessibility
- Add unit and integration tests

## License

MIT



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
