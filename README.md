# Note Taking App

A modern, responsive note-taking application built with Angular 18, featuring theme customization, search functionality, and full keyboard accessibility.

## 🚀 Features

### Core Functionality
- **Create, Edit, Delete Notes** - Full CRUD operations with form validation
- **Archive System** - Archive/unarchive notes for organization
- **Search & Filter** - Real-time search with tag-based filtering
- **Tag Management** - Organize notes with comma-separated tags

### User Experience
- **Theme System** - Light, Dark, and Custom color themes
- **Font Options** - Sans-serif, Serif, and Monospace fonts
- **Responsive Design** - Mobile-first approach with touch-friendly interface
- **Empty States** - Helpful messages and guidance when no content exists
- **Keyboard Accessibility** - Full keyboard navigation support

### Technical Features
- **Local Storage** - Persistent data storage in browser
- **Real-time Updates** - Reactive state management with RxJS
- **Component Architecture** - Modular, reusable components
- **SCSS Theming** - CSS custom properties for dynamic themes

## 🛠️ Setup Guide

#### Create New Project
```bash
# Create new Angular project
ng new note-taking-app
cd note-taking-app

# Add required dependencies
npm install lucide-angular
npm install uuid

# Start development server
ng serve
```

### Build for Production
```bash
# Build the app
ng build --prod

# Serve built files
ng serve --prod
```

## 📁 App Structure

```
src/
├── app/
│   ├── components/           # Reusable components
│   │   ├── search-filter/    # Search and tag filtering
│   │   └── settings/         # Theme settings modal
│   ├── pages/               # Route components
│   │   ├── notes-dashboard/ # Main notes view
│   │   ├── archived-notes/  # Archived notes view
│   │   ├── note-detail/     # View/edit single note
│   │   └── create-note/     # Create new note
│   ├── services/            # Business logic
│   │   ├── note.service.ts  # Note CRUD operations
│   │   └── theme.service.ts # Theme management
│   ├── models/              # TypeScript interfaces
│   │   └── note.model.ts    # Note data structure
│   └── styles/              # Global styles
│       ├── _variables.scss  # Theme variables
│       └── _mixins.scss     # Reusable mixins
```

## 🎯 User Workflow

### Getting Started
1. **First Visit** - Empty state with "Create Your First Note" button
2. **Create Note** - Fill title, content, and optional tags
3. **View Notes** - Grid layout with search and filter options
`

## 🎨 Theme System

### Available Themes
- **Light Theme** - Default white background
- **Dark Theme** - Dark gray background with light text
- **Custom Theme** - Green accent color variation

### Font Options
- **Sans-serif** - Modern, clean (Inter)
- **Serif** - Traditional, readable (Georgia)
- **Monospace** - Code-friendly (Monaco)

### Customization
Themes use CSS custom properties for real-time switching:
```scss
:root {
  --primary: #6366f1;
  --background: #ffffff;
  --text: #111827;
}

.theme-dark {
  --background: #1f2937;
  --text: #ffffff;
}
```

## ⌨️ Keyboard Accessibility

### Navigation
- **Tab** - Move between interactive elements
- **Enter/Space** - Activate buttons and links
- **Escape** - Close modals and dropdowns

### Specific Controls
- **Search Filter** - Tab to focus, type to search
- **Tag Dropdown** - Enter/Space to open, Arrow keys to navigate
- **Settings Modal** - Escape to close, Tab through options
- **Form Fields** - Standard form navigation

## 🔧 Technical Implementation

### State Management
- **RxJS Observables** - Reactive data flow
- **BehaviorSubject** - Current state tracking
- **Local Storage** - Persistent data storage

### Component Communication
```typescript
// Service-based communication
noteService.notes$ // Observable stream
noteService.createNote(data) // Action methods
themeService.setColorTheme(theme) // Theme updates
```

### Responsive Breakpoints
- **Mobile** - < 768px (single column, hamburger menu)
- **Tablet** - 768px - 1024px (2-3 columns)
- **Desktop** - > 1024px (full layout, 4+ columns)

## 🧪 Development

### Code Organization
- **Services** - Business logic and data management
- **Components** - UI presentation and user interaction
- **Models** - TypeScript interfaces for type safety
- **Styles** - SCSS with variables and mixins

### Best Practices
- **Subscription Management** - Proper cleanup with OnDestroy
- **Accessibility** - ARIA labels and keyboard support
- **Performance** - TrackBy functions and OnPush strategy
- **Type Safety** - Strong TypeScript typing throughout


## 📄 Author

Mildred Naab