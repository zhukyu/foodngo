import React, { useEffect, useState } from "react";
import "../../css/Category/Category.scss";
import Acclaimed from "./CategoryItem/Acclaimed";
import Chicken from "./CategoryItem/Chicken";
import FastFood from "./CategoryItem/FastFood";
import Drinks from "./CategoryItem/Drinks";
import Desserts from "./CategoryItem/Desserts";
import Burgers from "./CategoryItem/Burgers";
import Sandwiches from "./CategoryItem/Sandwiches";
import Coffee from "./CategoryItem/Coffee";
import Breakfast from "./CategoryItem/Breakfast";
import Bakery from "./CategoryItem/Bakery";
import Healthy from "./CategoryItem/Healthy";
import Vegan from "./CategoryItem/Vegan";
import Pizza from "./CategoryItem/Pizza";
import { Link, useNavigate } from "react-router-dom";

const categoryItems = [
  Acclaimed,
  Chicken,
  FastFood,
  Drinks,
  Desserts,
  Burgers,
  Sandwiches,
  Coffee,
  Breakfast,
  Bakery,
  Healthy,
  Vegan,
  Pizza,
];

const categoryName = [
  "acclaimed",
  "chicken",
  "fastfood",
  "drinks",
  "desserts",
  "burgers",
  "sandwiches",
  "coffee",
  "breakfast",
  "bakery",
  "healthy",
  "vegan",
  "pizza",
];

function Category() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const navigate = useNavigate();
  
    
  useEffect(() => {
    console.log(activeIndex);
    
  }, [activeIndex]);

  const checkActive = (index) => {
    {setActiveIndex(index);
        
        
    }
  };

  const handleReset = () => {
    setActiveIndex(-1);
    navigate("/restaurants");
  }
  return (
    <div className="Category">
    
      {categoryItems.map((CategoryItem, index) => {
        let link = `/restaurants?category=${categoryName[index]}`;
        return (
          <Link
            to={link}
            onClick={() => {
              checkActive(index);
            }}
          >
            <CategoryItem key={index} active={activeIndex===index ? true : false} />
          </Link>
        );
      })}
      {activeIndex !== -1 ? <button onClick={handleReset} className="clear_button">Clear&ensp;<i className="fa-solid fa-broom" style={{marginTop:"2%"}}></i></button> : ""}
    </div>
  );
}

export default Category;
