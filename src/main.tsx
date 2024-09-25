import React from 'react'
import { createRoot } from 'react-dom/client'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { UserProvider } from './context/UserContext'
import { DndProvider } from 'react-dnd'
import App from './App'
import './index.css'

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <UserProvider>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </UserProvider>
    </React.StrictMode>
  );
} else {
  console.error('Root container not found');
}
