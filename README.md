# WTWR (What to Wear?)

**Live demo:** [https://Ewell19.github.io/se_project_react/](https://Ewell19.github.io/se_project_react/)

## Backend Repository

Frontend API requests in this project target the WTWR backend:

- Backend repo: `https://github.com/Ewell19/se_project_backend`

## About the Project

WTWR is a full-stack weather-based clothing recommendation application that helps users decide what to wear based on current weather conditions. The app features user authentication, personalized profiles, real-time weather data, and a social-inspired like system for clothing items.

## Core Features

### Authentication & User Management

- User registration with email and password
- Secure login/logout functionality
- JWT-based token authentication
- Current user context management
- User profile editing (name and avatar)
- Session persistence with localStorage

### Weather & Clothing

- Real-time weather data integration using OpenWeatherMap API
- Dynamic clothing recommendations based on temperature (hot, warm, cold)
- Day/night detection with themed weather cards
- Temperature unit toggle (Fahrenheit/Celsius)
- Responsive card-based layout for clothing items
- Location-based weather information

### Wardrobe Management

- Add new clothing items with image URL and weather category
- View clothing items organized by weather type
- Delete clothing items (owner only)
- Like/unlike clothing items (requires authentication)
- Favorite items display on user profile
- Default starter clothing for new users

### User Experience

- Interactive heart icons for liking/unliking items
- Avatar selection with preset options or personal photo URL
- Customizable user avatars (gradient-styled defaults)
- Modal dialogs for user-friendly interactions
- Form validation and error messaging
- Responsive design for all screen sizes

## Technologies Used

- **React 18** - Frontend framework with hooks for state management
- **React Router DOM** - Client-side routing and protected routes
- **Vite** - Build tool and development server
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling and responsive design
- **OpenWeatherMap API** - Real-time weather data
- **JWT (JSON Web Tokens)** - Secure authentication
- **localStorage** - Client-side session persistence
- **ESLint** - Code quality and consistency

## Project Structure

```
src/
├── components/              # React components
│   ├── App/                # Main app component with routing
│   ├── Header/             # Navigation header with user info
│   ├── Main/               # Weather card and clothing grid
│   ├── Profile/            # User profile with liked items
│   ├── ItemCard/           # Clothing item card with like button
│   ├── ItemModal/          # Item details modal
│   ├── LoginModal/         # Login form
│   ├── RegisterModal/      # Registration form
│   ├── EditProfileModal/   # Profile editing form
│   ├── AddItemModal/       # Add garment form
│   ├── ModalWithForm/      # Reusable modal wrapper
│   ├── ToggleSwitch/       # F/C temperature toggle
│   ├── ProtectedRoute/     # Route guard component
│   └── Footer/
├── contexts/               # React Context
│   └── CurrentUserContext/ # Global user state
├── utils/                  # Utility functions
│   ├── api.js             # API client for backend
│   ├── auth.js            # Authentication helpers
│   ├── weatherApi.js      # Weather API integration
│   ├── clothingItems.js   # Default clothing data
│   └── constants.js       # Avatar presets and API config
├── assets/                # Images and icons
└── styles/                # Global styles
```

## Running the Project

### Prerequisites

- Node.js (v14 or higher)
- MongoDB running locally or connection to MongoDB Atlas
- Backend server running at `http://localhost:3001`

### Frontend Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to the provided local URL (typically `http://localhost:3000`)

### Backend Setup

1. Navigate to the backend directory: `cd test\ ground`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Backend API will be available at `http://localhost:3001`

## API Integration

The frontend communicates with the backend for:

- User authentication (signup, signin)
- Getting current authenticated user info
- Managing clothing items (CRUD operations)
- Like/unlike functionality
- User profile updates

All API requests include JWT tokens in the Authorization header for protected endpoints.

## Key Implementation Details

### Authentication Flow

1. User registers or logs in via modal forms
2. Backend returns JWT token
3. Token stored in localStorage
4. Token validated on app load to restore user session
5. All API requests include token in Authorization header
6. Token removed on logout

### Protected Routes

- `/profile` route is protected and only accessible to authenticated users
- Redirect to home page if user tries to access without authentication

### State Management

- Global user state via React Context (`CurrentUserContext`)
- Local component state for modals, forms, and UI
- Clothing items managed in App component state
- Weather data cached and displayed across components

### Styling

- Custom CSS with modular component styles
- Interactive elements include hover and active states
- Responsive design using flexbox and grid
- Gradient backgrounds for avatar placeholders
- Themed weather cards based on conditions and time of day
