# Freelancer Portfolio Platform

A modern React application for managing freelancer portfolio projects, built with TypeScript and Vite.

## Features

- Add new portfolio projects with detailed information
- Project title, role, description, and skills management
- Content addition (URL links supported)
- Character limits and validation
- Dark theme UI
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
  ├── components/
  │   └── AddPortfolioProject.tsx    # Main portfolio addition form
  ├── App.tsx                         # Main app component
  ├── main.tsx                        # Entry point
  └── index.css                      # Global styles
```

## Notes

- Image upload, file upload, text blocks, and audio content types are disabled (marked with 'x')
- Optional fields are marked with "(optional)"
- Required fields are marked with "*"
- Character limits are enforced for all text inputs
- Maximum of 5 skills can be added per project

