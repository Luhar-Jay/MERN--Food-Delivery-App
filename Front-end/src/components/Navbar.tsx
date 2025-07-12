import { Search, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useUserContext();

  console.log("user =>>", user);

  const [menu, setMenu] = useState("Home");

  const menuItems = ["Home", "Menu", "Mobile-app", "Contact us"];
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex justify-between px-16 items-center p-2 border-b border-gray-600 shadow-2xl">
      <img
        className="md:h-24 md:w-24 sm:h-20 sm:w-20 cursor-pointer object-contain"
        src="https://img.freepik.com/free-vector/ecofood-logo-template_1195-33.jpg?t=st=1747730079~exp=1747733679~hmac=6dc2644854af7c2a9576dc4f6ee43491618db6c9f81a83b920f412dc686d6888&w=1380"
        alt="Logo"
      />

      <ul className="flex gap-4">
        {menuItems.map((item) => (
          <li
            key={item}
            onClick={() => setMenu(item)}
            className={`cursor-pointer px-3 py-2 rounded-md transition-all duration-200
              ${
                menu === item
                  ? "border-b-2 border-orange-500 text-orange-600 font-semibold"
                  : "hover:text-orange-600"
              }`}
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="flex gap-8 p-4 items-center">
        <Search className="h-7 w-7 cursor-pointer" />
        <div className="relative">
          <ShoppingBasket className="h-7 w-7 cursor-pointer" />
          <div className="absolute w-2 h-2 bg-orange-600 rounded-full right-0 -top-1"></div>
        </div>
        {!isAuthenticated ? (
          <button
            className="rounded-full border hover:border-orange-600 p-2 border-gray-600 font-medium cursor-pointer w-28"
            onClick={handleLogin}
          >
            Sign in
          </button>
        ) : (
          <button
            className="rounded-full border hover:border-orange-600 p-2 border-gray-600 font-medium cursor-pointer w-28"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
