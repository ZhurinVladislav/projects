import Menu from '../Menu';
import HeaderTop from './HeaderTop';

const Header = () => {
  return (
    <header data-testid="header" className="section">
      <div className="container flex flex-col items-center justify-between">
        <HeaderTop />
        <Menu />
      </div>
    </header>
  );
};

export default Header;
