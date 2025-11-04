
# Hybrid Text Compressor

A modern, web-based application that provides an efficient hybrid text compression system using a combination of Huffman Coding and LZW algorithms. Users can create an account, upload text files, view detailed compression statistics, manage their compression history, and download the resulting compressed files.

![Hybrid Text Compressor Dashboard](https://i.imgur.com/example.png) <!-- Placeholder for a screenshot -->

---

## Table of Contents

- [Key Features](#key-features)
- [How It Works](#how-it-works)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Component Overview](#component-overview)
- [Getting Started](#getting-started)
- [Future Improvements](#future-improvements)

---

## Key Features

- **Hybrid Compression:** Leverages a two-stage process combining LZW and Huffman algorithms for optimal lossless text compression.
- **User Authentication:** Secure registration and login system for managing user sessions.
- **Intuitive File Upload:** Supports both drag-and-drop and traditional file browsing for `.txt` files (up to 16MB).
- **Detailed Analytics:** Provides instant feedback on compression performance, including original size, compressed size, compression ratio, and processing time.
- **Compression History:** Authenticated users can view and track a history of their past compression tasks.
- **Responsive Design:** A mobile-friendly interface built with Tailwind CSS ensures a seamless experience across all devices.
- **Modern UI/UX:** A clean, intuitive, and aesthetically pleasing user interface with smooth transitions and helpful toast notifications.

---

## How It Works

The core of the application is its hybrid compression strategy, designed to maximize efficiency for text-based data.

1.  **LZW Compression:** The Lempel-Ziv-Welch algorithm is applied first. It excels at identifying and replacing repeating sequences of characters with shorter codes from a dynamically generated dictionary. This is highly effective for text with recurring patterns.
2.  **Huffman Encoding:** The output from the LZW stage is then processed by the Huffman coding algorithm. This method assigns variable-length binary codes to characters based on their frequency of appearance—more frequent characters get shorter codes. This further reduces the overall file size.
3.  **Optimized Output:** The result is a highly compressed, lossless file that can be perfectly reconstructed to its original state.

*Note: In the current version, the compression logic is mocked to simulate the process and demonstrate the frontend functionality.*

---

## Technology Stack

-   **Frontend:** [React](https://reactjs.org/) (with Hooks), [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **State Management:** React Context API
-   **Icons:** Custom SVG-based icon component for a lightweight and consistent look.

---

## Project Structure

The project follows a component-based architecture, organized for clarity and scalability.

```
/
├── components/
│   ├── Icon.tsx          # SVG icon library
│   ├── Layout.tsx        # Main layout with Navbar and Footer
│   └── Toast.tsx         # Toast notification system
├── pages/
│   ├── DashboardPage.tsx # User dashboard for file compression
│   ├── HomePage.tsx      # Landing page
│   ├── LoginPage.tsx     # User login form
│   └── RegisterPage.tsx  # User registration form
├── utils/
│   └── helpers.ts        # Helper functions (e.g., formatFileSize)
├── App.tsx               # Root component, handles routing and auth context
├── index.html            # Main HTML entry point
├── index.tsx             # React DOM renderer
├── metadata.json         # Application metadata
└── types.ts              # Shared TypeScript interfaces
```

---

## Component Overview

-   **`App.tsx`**: The main application component. It manages the global state for user authentication and page navigation using the React Context API. It acts as a simple router, rendering the correct page based on the user's auth status and current view.
-   **`pages/`**: Each file in this directory represents a full page view.
    -   `HomePage`: The public-facing landing page that explains the application's features and benefits.
    -   `LoginPage` / `RegisterPage`: Handle user authentication. Forms include validation and loading states.
    -   `DashboardPage`: The core of the application for authenticated users. It is composed of several sub-components to manage file uploads, display results, and list compression history.
-   **`components/`**: Contains reusable UI elements used across different pages.
    -   `Layout`: Wraps pages to provide a consistent Navbar and Footer. The Navbar dynamically changes based on the user's authentication state.
    -   `Toast`: A provider and hook (`useToast`) for displaying global notifications for success, error, and info states.
    -   `Icon`: A performant component that renders SVG icons by name, reducing dependencies on external libraries.

---

## Getting Started

This application is designed to run in a specific web-based development environment.

1.  **Dependencies:** All dependencies are loaded via an `importmap` in `index.html`, requiring no local installation (`npm install`).
2.  **Environment Variables:** The application expects an API key to be available for potential future API integration, but it is not currently used by the mocked backend.
3.  **Running the App:** The application is served and rendered directly by the host environment. Simply load the project files, and the `index.html` file will serve as the entry point.

---

## Future Improvements

-   **Real Backend Implementation:** Replace the mocked API calls with a real backend service (e.g., Node.js, Python) to perform the actual Huffman and LZW compression algorithms.
-   **Database Integration:** Connect the application to a database (like PostgreSQL or MongoDB) to persist user data and compression history.
-   **Real-time Progress:** Implement WebSockets to show real-time compression progress for large files.
-   **Broader File Support:** Extend the application to support other file types beyond `.txt`.
-   **Unit & Integration Tests:** Add a testing framework like Jest and React Testing Library to ensure code quality and reliability.

