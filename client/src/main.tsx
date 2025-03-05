import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

async function startApp() {
  try {
    console.log('Starting application...');

    if (process.env.NODE_ENV === 'development') {
      console.log('Initializing MSW...');
      const { worker } = await import('./mocks/browser');
      await worker.start({
        onUnhandledRequest: 'bypass',
      });
      console.log('MSW initialized successfully');
    }

    console.log('Rendering React application...');
    createRoot(document.getElementById("root")!).render(<App />);
    console.log('Application started successfully');
  } catch (error) {
    console.error('Error starting application:', error);
  }
}

startApp();