const Navbar = () => {
  return (
    <header className="border-b border-gray-300 bg-white shadow-sm">
      <div className="flex justify-between items-center px-4 sm:px-6 py-3 max-w-screen-xl mx-auto">
        {/* Logo */}
        <img
          className="h-14 w-14 sm:h-20 sm:w-20 cursor-pointer object-contain"
          src="https://img.freepik.com/free-vector/ecofood-logo-template_1195-33.jpg?t=st=1747730079~exp=1747733679~hmac=6dc2644854af7c2a9576dc4f6ee43491618db6c9f81a83b920f412dc686d6888&w=1380"
          alt="Logo"
        />

        {/* Profile */}
        <img
          className="h-10 w-10 sm:h-14 sm:w-14 rounded-full cursor-pointer object-cover"
          src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1747729903~exp=1747733503~hmac=57e2fe5ba901194e58ecbc3c1fb5e26b1933875d6a05c569a06d226875634afe&w=1380"
          alt="Profile"
        />
      </div>
    </header>
  );
};

export default Navbar;
