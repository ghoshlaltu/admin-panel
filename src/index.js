// index.js
import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// 👇️ wrap App in Router

root.render(
  <Router>
    <App />
  </Router>
);