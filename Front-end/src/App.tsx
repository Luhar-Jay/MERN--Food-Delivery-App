import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#363636",
          },
          success: {
            duration: 3000,
            style: {
              background: "#4aed88",
              color: "#000",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#ff4b4b",
              color: "#fff",
            },
          },
        }}
      />
      <UserProvider>
        <div className="font-outfit ">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/place-order" element={<PlaceOrder />} />
          </Routes>
        </div>
      </UserProvider>
    </>
  );
}

export default App;
