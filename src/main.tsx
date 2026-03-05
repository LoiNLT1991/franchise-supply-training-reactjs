import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { setupApi } from "./api/axios.config.ts";

// Import global styles
import "./index.css";

// Setup API configurations
setupApi();

createRoot(document.getElementById("root")!).render(
  //   <StrictMode>
  <>
    <App />
    <Toaster richColors position="top-right" />
  </>,
  //   </StrictMode>,
);
