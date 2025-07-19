import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/storeContex";

interface FoodItemProps {
  name: string;
  price: number;
  description: string;
  image: string;
}

const FoodItem: React.FC<FoodItemProps> = ({
    id,
  name,
  price,
  description,
  image,
}) => {

    const {cartItems, addToCart, setCartItems, removeCart} = useContext(StoreContext)



  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row transition-transform hover:scale-105 duration-200 ">
      <div className="md:w-1/3 w-full flex items-center justify-center p-4 bg-gray-50 gap-2">
      {
        !cartItems[id] ? <img src={assets.add_icon_white} alt="" onClick={()=>addToCart(id)}/>  :
        <div className="flex gap-2">
            <img onClick={()=>removeCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
        </div>  
      }
        <img
          src={image}
          alt={name}
          className="object-cover rounded-lg w-32 h-32 md:w-40 md:h-40"
        />
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-lg font-semibold text-gray-800">{name}</p>
            <img
              src={assets.rating_starts}
              alt="rating"
              className="w-20 h-5 object-contain"
            />
          </div>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xl font-bold text-green-600">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
