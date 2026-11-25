import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";
import { ThemeProvider } from "./providers/ThemeProvider";
import { PersonalDataProvider } from "./providers/PersonalDataProvider";
import { CursorProvider } from "./providers/CursorProvider";

const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const App = () => (
  <ThemeProvider>
    <PersonalDataProvider>
      <CursorProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="*"
              element={
                <Suspense fallback={null}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </CursorProvider>
    </PersonalDataProvider>
  </ThemeProvider>
);

export default App;
