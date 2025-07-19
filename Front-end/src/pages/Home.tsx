import { useEffect, useState } from "react";
import ExploreMenu from "../components/ExploreMenu";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import FoodDisplay from "../components/FoodDisplay/FoodDisplay";

const Home = () => {
  const [category, setCategory] = useState<string>("All");
  const navigate = useNavigate()
  useEffect(()=>{
    if (localStorage.getItem('user')) {
      navigate('/')
    }
  },[])
  return (
    <div className="max-w-[200vh] mx-auto">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category = {category}/>
    </div>
  );
};

export default Home;
