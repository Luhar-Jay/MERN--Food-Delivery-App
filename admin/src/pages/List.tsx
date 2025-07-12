import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/list`
    );
    if (response.data.success) {
      setList(response.data.data);
    }
  };

  const removeFood = async (foodId: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/remove`,
        { id: foodId }
      );

      if (!response.data.success) {
        alert(response.data.message || "Failed to delete food");
        return;
      }
      console.log(response.data);

      toast.success(response.data.message || "Success");
      await fetchList();
    } catch (error) {
      console.error("Error deleting food:", error);
      alert("Server error. Try again later.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const url = "http://localhost:8080";

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <p className="text-xl font-semibold mb-4">All Food List</p>
      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="w-full hidden sm:table">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Image
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Price
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {list.map((product, index) => (
              <tr key={index}>
                <td className="px-4 py-2">
                  <img
                    src={`${url}/images/${product.image}`}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => removeFood(product._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Card View */}
        <div className="sm:hidden space-y-4 p-2">
          {list.map((product, index) => (
            <div
              key={index}
              className=" rounded-lg p-4 shadow-sm bg-white space-y-2"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium">Image:</span>
                <img
                  src={`${url}/images/${product.image}`}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </div>
              <div>
                <span className="font-medium">Name:</span> {product.name}
              </div>
              <div>
                <span className="font-medium">Category:</span>{" "}
                {product.category}
              </div>
              <div>
                <span className="font-medium">Price:</span> ${product.price}
              </div>
              <div>
                <span className="font-medium">Action:</span>{" "}
                <button
                  onClick={() => removeFood(product._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
