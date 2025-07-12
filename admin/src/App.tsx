import { Route, Routes } from "react-router-dom";
import Navbar from "./component/navbaar/Navbar";
import SideBar from "./component/sidebaar/SideBar";
import AddItem from "./pages/AddItem";
import Order from "./pages/Order";
import List from "./pages/List";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="font-outfit h-[100vh]">
      <ToastContainer />
      <Navbar />
      <div className="flex">
        <SideBar />
        <Routes>
          <Route path="/add" element={<AddItem />} />
          <Route path="/order" element={<Order />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
