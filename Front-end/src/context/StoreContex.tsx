import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext('');

import { ReactNode } from "react";

interface StoreContextProviderProps {
  children: ReactNode;
}

interface CartItems {
  [itemId: string]: number;
}

const StoreContextProvider = (props: StoreContextProviderProps) => {

    const [cartItems, setCartItems] = useState<CartItems>({})

    const addToCart = (itemId: string) => {
        if (!cartItems[itemId]) {
            setCartItems((prev: CartItems) => ({ ...prev, [itemId]: 1 }))
        }else {
            setCartItems((prev)=> ({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const removeCart = (itemId:string) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }



  const contextValue = {
    food_list,
    addToCart,
    cartItems,
    setCartItems,
    removeCart
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
