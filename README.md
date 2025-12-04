# 🎬 Otaku Vault

A React Native mobile application built with Expo that allows anime and manga enthusiasts to discover, search, and explore their favorite series. Browse top airing anime, upcoming releases, and search through a comprehensive database powered by the Jikan API (MyAnimeList).

## 📱 Features

- **Browse Top Airing Anime** - Discover currently airing anime series
- **Upcoming Releases** - Stay updated on upcoming anime releases
- **Search Functionality** - Search for anime by title with instant results
- **Anime/Manga Toggle** - Switch between anime and manga browsing
- **Advanced Filtering** - Filter content by type, status, and other parameters
- **Anime Details** - View detailed information about specific anime/manga
- **Beautiful UI** - Modern gradient-based design with smooth navigation
- **Cross-Platform** - Works on iOS, Android, and Web

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev/) with [React Native](https://reactnative.dev/)
- **Navigation**: [Expo Router](https://expo.github.io/router/) - File-based routing
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **API**: [Jikan API](https://jikan.moe/) (MyAnimeList unofficial API)

## 📂 Project Structure

```
├── app/                          # Expo Router pages
│   ├── _layout.tsx              # Root layout and navigation
│   ├── index.tsx                # Home page (top airing/upcoming)
│   ├── anime.tsx                # Search page with filters
│   └── anime/
│       └── [id].tsx             # Anime detail page
├── components/                   # Reusable React components
│   ├── MalApi.tsx              # API data fetching component
│   ├── AnimeList.tsx           # Anime list display
│   ├── SearchBar.tsx           # Search input component
│   ├── FilterModal.tsx         # Filter selection modal
│   ├── MangaList.tsx           # Manga list display
│   └── styles.tsx              # Global styling
├── utils/
│   └── ApiClient.ts            # Jikan API client
├── assets/                       # Images and icons
├── package.json                  # Dependencies
├── app.json                      # Expo configuration
└── tsconfig.json                # TypeScript config
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (optional, but recommended)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Mockingjay-HrGs/Otaku_Vault.git
cd Otaku_Vault
```

2. Install dependencies
```bash
npm install
```

3. Start the development server with expo
```bash
npx expo start
```

## 📖 Usage

### Home Screen
- View top airing anime and upcoming releases
- Switch between tabs to see different categories
- Tap the search icon to navigate to the search page

### Search Page
- Search for anime/manga by title
- Toggle between Anime and Manga modes
- Apply advanced filters (status, type, etc.)
- Tap any result to view details

### Detail Page
- View comprehensive information about selected anime/manga
- See episodes, image, synopsis, and more

## 🔌 API Integration

The app uses the **Jikan API** - an unofficial MyAnimeList API. Key endpoints used:

- `GET /top/anime?filter=airing` - Top airing anime
- `GET /anime/{id}` - Anime details
- `GET /anime?query=...` - Search anime
- Similar endpoints for manga

No authentication required for basic queries.

## 🎨 Styling

Global styles are defined in `components/styles.tsx` and include:
- Custom gradient backgrounds
- Responsive spacing and sizing
- Typography for headers and body text
- Component-specific styling

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `expo-router` | File-based navigation |
| `expo-linear-gradient` | Gradient UI elements |
| `react-native` | Mobile UI framework |
| `expo-image` | Image loading |
| `react-navigation` | Navigation primitives |

## 🧪 Development

### Project Reset
To reset the project to its initial state:
```bash
npm run reset-project
```

## 📱 App Configuration

The app is configured in `app.json` with:
- App name: **otakuVault**
- Version: **1.0.0**
- Orientation: **Portrait**
- Theme: **Automatic** (follows system settings)

## 🌟 Features Explained

### MalApi Component
Handles all data fetching from the Jikan API, including:
- Loading states
- Error handling
- Pagination support
- Data formatting

### FilterModal Component
Advanced filtering options for:
- Anime vs Manga selection
- Status filters (airing, upcoming, etc.)
- Type filters (TV, Movie, OVA, etc.)

### ApiClient Utility
Centralized API client for:
- Base URL management
- Request handling
- Error management
- URL parameter building
