
import Logo from "../assets/u_logo.png";
import { useSelector } from "react-redux";

function Header({
  uniqueOrderCount,
  startedOrderCount,
  waitingOrderCount,
}) {


  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

 

  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      <header className="flex justify-between dark:text-white items-center">
        {/* Left Side */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <h3 className="md:text-4xl hidden md:inline-block font-bold font-sans">
            Genom
          </h3>
          <div className="flex items-center">
            <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
              {board.name}
            </h3>
          </div>
        </div>

        {/* Right Side */}

        <div className="flex space-x-4 items-center ">
          <span className="text-sm text-black-500 md:text-xl">
            {uniqueOrderCount} ordens
          </span>
          <span className="text-sm text-green-500 md:text-xl">
            {startedOrderCount} OP iniciadas
          </span>
          <span className="text-sm text-orange-500 md:text-xl">
            {waitingOrderCount} OP em espera
          </span>
        </div>

        
      </header>
    </div>
  );
}

export default Header;
