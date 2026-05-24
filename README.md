# Stopwatch & Timer App

A modern, minimal, and human-centric stopwatch and timer application built with React and Vite. Features a clean interface with light and dark theme support.

## Features

✨ **Stopwatch**
- Track elapsed time with centisecond precision (MM:SS.CS format)
- Start, pause, and reset controls
- Live status indicator (Ready, Running, Paused)

⏱️ **Timer**
- Custom countdown timer with hour, minute, and second inputs
- Start, pause, and reset functionality
- Visual status indication (Ready to start, Running, Paused, Time is up!)

🎨 **Modern Design**
- Clean, minimal UI with human-centric design principles
- Light and dark theme toggle
- Smooth transitions and subtle animations
- Fully responsive layout (mobile, tablet, desktop)

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Theme Toggle

The app includes a built-in theme switcher in the header:
- **Light Mode** (☀️): Clean, bright interface with sage green accents
- **Dark Mode** (🌙): Dark interface with matching green accents for comfortable viewing

Click the theme toggle button in the top-right corner to switch between themes.

## Architecture

### Project Structure
```
src/
  ├── App.jsx          # Main component with stopwatch and timer logic
  ├── App.css          # Styling with theme variables
  ├── index.css        # Global styles
  ├── main.jsx         # Entry point
  └── assets/          # Images and static files
```

### Key Components
- **App.jsx**: Contains both stopwatch and timer state management with view switching
- **Theme System**: Uses CSS custom properties for easy dark/light mode switching

## Technology Stack

- **React 18+** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with custom properties for theming

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Design Principles

The UI follows modern design best practices:
- **Minimal**: Focuses on essential controls without unnecessary visual clutter
- **Human-centric**: Large, readable text and clear visual hierarchy
- **Accessible**: Proper ARIA labels and semantic HTML
- **Responsive**: Adapts beautifully to any screen size
- **Performant**: Smooth animations with optimized CSS transitions

## Color Palette

### Light Mode
- Primary: Sage Green (#4a7c59)
- Background: Light Gray (#fafbfc)
- Text: Dark Gray (#1a1a2e)

### Dark Mode
- Primary: Fresh Green (#3fb950)
- Background: Dark (#0f1117)
- Text: Light Gray (#e6edf3)

## Future Enhancements

- Lap/split functionality for stopwatch
- Sound notifications when timer ends
- Keyboard shortcuts
- Local storage for settings persistence
- Export timer history

## License

This project is open source and available under the MIT License.

## Author

Built as a modern React learning project focusing on clean design and best practices.
