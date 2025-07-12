import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useEffect, useState } from "react";
import { getAllFoods } from "../utils/apiPath";

interface IFood {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  menu_name?: string; // Optional in case the API returns this field
}

const ExploreMenu = () => {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleFoods = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await axios.get(`${baseUrl}/${getAllFoods}`);
      console.log("result food", result.data);
      console.log("result.data type:", typeof result.data);
      console.log("result.data is array:", Array.isArray(result.data));

      // Handle different possible response structures
      let foodsData = result.data;
      if (
        result.data &&
        typeof result.data === "object" &&
        !Array.isArray(result.data)
      ) {
        // If the response is an object, check for common properties
        if (result.data.data && Array.isArray(result.data.data)) {
          foodsData = result.data.data;
        } else if (result.data.foods && Array.isArray(result.data.foods)) {
          foodsData = result.data.foods;
        } else if (result.data.items && Array.isArray(result.data.items)) {
          foodsData = result.data.items;
        } else {
          // If it's an object but not an array, try to convert it
          foodsData = Object.values(result.data);
        }
      }

      // Ensure we have an array
      if (Array.isArray(foodsData)) {
        setFoods(foodsData);
      } else {
        console.error("API response is not an array:", foodsData);
        setError("Invalid data format received from server");
      }
    } catch (err) {
      console.error("Error fetching foods:", err);
      setError("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFoods();
  }, []);

  if (loading) {
    return (
      <div className="text-center px-4 py-8 max-w-6xl mx-auto">
        <p className="text-gray-600">Loading menu items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center px-4 py-8 max-w-6xl mx-auto">
        <p className="text-red-600">{error}</p>
        <button
          onClick={handleFoods}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="text-center px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Explore our menu
      </h1>
      <p className="text-gray-600 mb-10">
        Craving something delicious? Explore our mouth-watering menu made with
        fresh ingredients and bold flavors.
      </p>
      <div
        className="overflow-x-auto px-4 py-6"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex gap-4 w-[calc(120px*4+48px)]">
          {Array.isArray(foods) && foods.length > 0 ? (
            foods.map((item: IFood, index) => (
              <div
                key={index}
                className="min-w-[180px] overflow-x-hidden scrollbar-hide bg-white rounded-lg shadow p-4 flex flex-col items-center"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover mb-2 rounded-full"
                />
                <p className="text-gray-700 text-sm font-medium">{item.name}</p>
                <p className="text-gray-500 text-xs mt-1">${item.price}</p>
              </div>
            ))
          ) : (
            <div className="text-center w-full py-8">
              <p className="text-gray-500">No menu items available</p>
            </div>
          )}
        </div>
      </div>
      <hr className="border-b-2 w-full items-center mt-5 border-gray-300" />
    </div>
  );
};

export default ExploreMenu;
