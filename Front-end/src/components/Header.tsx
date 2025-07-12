import "animate.css";
import useUser from "./Login/useUser";
import { useUserContext } from "../context/UserContext";

const Header = () => {
  const { user: contextUser, isAuthenticated } = useUserContext();

  // Fetch user data if we have a user ID
  const { user: fetchedUser } = useUser(contextUser?._id);

  // Use fetched user data if available, otherwise use context user
  const displayUser = fetchedUser || contextUser;

  return (
    <div className="relative my-7 mx-auto w-[100%] h-[70vh] bg-[url('/header_img.png')] bg-cover bg-center rounded-xl shadow-lg">
      <div className="flex item-center justify-center mx-auto w-1/2 ">
      {isAuthenticated && displayUser && (
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
            <p className="text-xl font-semibold">
              Welcome back, {displayUser.userName}! 👋
            </p>
            <p className="text-sm opacity-90">
              Ready to order your favorite dishes?
            </p>
          </div>
        )}
        </div>
      <div className="absolute top-1/4 left-10 animate__animated animate__fadeIn animate__slow text-white max-w-xl space-y-4">
        <h2 className="text-7xl font-bold">Order your favorite food</h2>
        <p className="text-lg">
          Craving something delicious? Explore our mouth-watering menu made with
          fresh ingredients and bold flavors.
        </p>

        {/* Display user welcome message if logged in */}
        

        <button className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-md text-white font-semibold shadow-md">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
