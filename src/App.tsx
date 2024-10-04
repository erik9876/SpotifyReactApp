import { Suspense, lazy } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import theme from "./theme"; // Extracted theme configuration
import AppProviders from "./contexts/AppProviders"; // Context providers including SearchProvider
import ErrorBoundary from "./components/ErrorBoundary"; // Error Boundary Component
import LoadingComponent from "./components/LoadingComponent"; // Placeholder for loading components

// Lazy-loaded components
const NavBar = lazy(() => import("./components/NavBar"));
const Footer = lazy(() => import("./components/Footer"));
const Home = lazy(() => import("./pages/Home"));
const ResultList = lazy(() => import("./components/ResultList"));
const PlaylistList = lazy(() => import("./components/PlaylistList"));
const TopItems = lazy(() => import("./components/TopItems"));
const Callback = lazy(() => import("./auth/Callback"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <AppProviders>
          <Suspense fallback={<LoadingComponent />}>
            <NavBar />
            <div id="body">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<ResultList />} />
                <Route path="/playlists" element={<PlaylistList />} />
                <Route path="/top" element={<TopItems />} />
                <Route path="/callback" element={<Callback />} />
              </Routes>
            </div>
            <Footer />
          </Suspense>
        </AppProviders>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
