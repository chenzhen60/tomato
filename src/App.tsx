import { Outlet } from "react-router-dom";
import "./App.css";
import LeftMenus from "./pages/left_menus";

function App() {

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <div className="w-3/12 h-screen">
        <LeftMenus />
      </div>
      <div className="w-9/12 h-screen overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
