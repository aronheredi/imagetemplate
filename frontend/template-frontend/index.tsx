import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './src/App.tsx';
import './src/styles/global.css';

// Ensure fabric customProperties/module augmentation is executed before any canvas usage
import './src/utils/fabric-properties';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
