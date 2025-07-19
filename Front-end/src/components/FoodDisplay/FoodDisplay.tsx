import { useContext } from "react";
import { StoreContext } from "../../context/storeContex";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="font-bold text-xl mb-4 ml-5">
      <h1>Top dish near you</h1>

      <div>
        {food_list.map((item:any, index:any) => {
          return (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
