import { NavLink } from 'react-router-dom';

import Logo from '@/components/Logo';
import { ROUTES } from '@/routes/constants';

function Header() {
  return (
    <header className="header">
      <nav>
        <NavLink to={ROUTES.HOME}>
          <Logo />
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
