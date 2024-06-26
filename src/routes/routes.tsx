import { Routes, Route } from 'react-router-dom';

import { ROUTES } from './constants';

import Home from '@/pages/Home';
import Page404 from '@/pages/Page404';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
