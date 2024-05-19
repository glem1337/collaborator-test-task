import { BrowserRouter as Router } from 'react-router-dom';

import Header from '@/layout/Header';
import AppRoutes from '@/routes/routes';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Header />

        <main className="app__content container">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}
