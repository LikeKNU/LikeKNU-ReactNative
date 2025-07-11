# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm start` - Start Expo development server
- `npm run android` - Run on Android (requires Android development environment)
- `npm run ios` - Run on iOS (requires iOS development environment)
- `npm run web` - Run on web browser
- `npm test` - Run Jest tests in watch mode

### Building
- Use Expo CLI commands for building: `npx expo build:android` / `npx expo build:ios`
- EAS Build configuration is in `eas.json`

## Architecture Overview

### Tech Stack
- **Framework**: React Native with Expo (~53.0.9)
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React Context + SWR for data fetching
- **Styling**: StyleSheet with custom theming system
- **HTTP Client**: Axios with custom wrapper
- **Maps**: Naver Maps (@mj-studio/react-native-naver-map)
- **Ads**: Google Mobile Ads
- **Analytics**: Firebase Analytics

### Project Structure
```
app/                    # Expo Router pages
├── (tabs)/            # Tab navigation layout
├── _layout.tsx        # Root layout with providers
├── [feature]/         # Feature-specific pages
common/                # Shared components and utilities
├── contexts/          # React Context providers
├── components/        # Reusable UI components
├── text/             # Typography components
api/                   # API service functions
constants/             # Static configuration
types/                 # TypeScript type definitions
utils/                 # Utility functions
assets/               # Static assets (images, fonts, SVGs)
```

### Key Architecture Patterns

#### Context Providers
Three main contexts wrap the entire app:
- `ThemeContext` - Light/dark/auto theme management
- `CampusContext` - Campus selection (SINGWAN/CHEONAN/YESAN)
- `FavoriteContext` - User favorites management

#### Navigation
Uses Expo Router with file-based routing:
- Tab navigation defined in `app/(tabs)/_layout.tsx`
- Pages are organized by feature in separate directories
- Each feature has its own components subdirectory

#### Data Fetching
- SWR for caching and data synchronization
- Custom HTTP client (`utils/http.ts`) with axios
- API functions in `api/` directory return SWR hooks
- Automatic device ID header injection

#### Styling System
- Custom theme system with light/dark variants
- Colors defined in `constants/colors.ts`
- Custom fonts (Pretendard) loaded via `expo-font`
- Responsive design with device-specific styling

### Key Features
- **Multi-Campus Support**: App serves 3 university campuses
- **Offline-First**: SWR caching for offline functionality
- **Push Notifications**: Expo notifications integration
- **Analytics**: Firebase Analytics tracking
- **Maps Integration**: Naver Maps for campus locations
- **Ads**: Google AdMob integration
- **Auto-Updates**: Expo Updates for OTA updates

### Development Notes
- SVG assets are transformed via `react-native-svg-transformer`
- Environment variables loaded via `react-native-dotenv`
- TypeScript with strict mode enabled
- Path aliases configured with `@/*` pointing to project root
- Jest testing framework with `jest-expo` preset