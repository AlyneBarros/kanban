import SuaLogo from '../assets/UqTransp2.svg';

function HeaderLogin() {
  return (
    <header className="bg-gray-100 shadow-md flex items-center fixed top-0 left-0 w-full h-16 justify-between px-4">
      <div className="flex items-center">
        <img src={SuaLogo} alt="Logo União Química" className="h-8" />
      </div>
      <nav>

      </nav>
    </header>
  );
}

export default HeaderLogin;
