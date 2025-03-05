import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

async function startApp() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }

  createRoot(document.getElementById("root")!).render(<App />);
}

startApp();