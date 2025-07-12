import axios from "axios";
import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "react-toastify";

interface ProductData {
  name: string;
  price: number;
  description: string;
  category: string;
}
const AddItem: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [data, setData] = useState<ProductData>({
    name: "",
    price: 0,
    description: "",
    category: "salad",
  });

  const onchangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({
      ...data,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/add-food`,
      formData
    );
    if (response.data.success) {
      setData({
        name: "",
        price: 0,
        description: "",
        category: "salad",
      });
      setImage(null);

      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    console.log(response);
  };

  return (
    <div className=" mt-16 text-base text-slate-600 mx-[74px] w-full">
      <form className="space-y-2.5" onSubmit={onSubmitHandler}>
        <div className="flex flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              className="w-32"
              src={
                image
                  ? URL.createObjectURL(image)
                  : "https://static.cognitoforms.com/website/assets/file-uploads.B5WugjUs.png"
              }
              alt=""
            />
          </label>
          <input
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }}
            type="file"
            id="image"
            hidden
            required
            className="w-full border border-black"
          />
        </div>
        <div className="space-y-2.5">
          <p>Product Name</p>
          <input
            onChange={onchangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            className="border p-2.5"
          />
        </div>
        <div className="space-y-2.5">
          <p>Description</p>
          <textarea
            onChange={onchangeHandler}
            value={data.description}
            className="p-2.5 border"
            name="description"
            rows={6}
            placeholder="Write content here"
            required
          />
        </div>
        <div className="space-y-2.5 sm:flex ">
          <div className="space-y-2.5">
            <p>Product Category</p>
            <select
              onChange={onchangeHandler}
              value={data.category}
              name="category"
              className="border p-2"
            >
              <option value="salad">Salad</option>
              <option value="rolls">Rolls</option>
              <option value="desert">Desert</option>
              <option value="sandwitch">Sandwitch</option>
              <option value="cake">Cake</option>
              <option value="pasta">Pasta</option>
              <option value="pure veg">Pure veg</option>
              <option value="noodles">Noodles</option>
            </select>
          </div>
          <div className=" space-y-2.5 ">
            <p>Product price</p>
            <input
              onChange={onchangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              className="border p-2 max-w-32"
            />
          </div>
        </div>

        <button
          type="submit"
          className="p-4 bg-blue-900 hover:bg-blue-800 cursor-pointer text-white font-semibold rounded-lg w-36 "
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddItem;
