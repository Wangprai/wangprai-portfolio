import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { ThemeProvider } from "./providers/ThemeProvider";
import { PersonalDataProvider } from "./providers/PersonalDataProvider";

const App = () => (
  <ThemeProvider>
    <PersonalDataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </PersonalDataProvider>
  </ThemeProvider>
);

export default App;
