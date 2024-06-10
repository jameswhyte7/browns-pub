import { useState } from "react";
import FoodSkeleton from "./FoodSkeleton";
import FoodItem from "./FoodItem";
import useFetch from "../../../hooks/useFetch";
import { Typography } from "@material-tailwind/react";
import { menuItems } from "../../../data/menu";
import "./FoodItem.css"

function Menu({ active }) {
  const [menuTab, setMenuTab] = useState("all");
  const { foods, loading } = useFetch();

  // const filteredFoods =
  //   menuTab === "all"
  //     ? menuItems
  //     : menuItems.filter((item) => item.category === menuTab);

  // const handleMenuTabs = (type) => {
  //   setMenuTab(type);
  // };

  return (
    <section id="sectionmenu" className="my-8 max-w-screen-xl mx-auto px-4">
      <div className="text-center mb-6">
        <Typography variant="h4" color="white" style={{ fontSize: '2rem' }}>
          EXPLORE OUR MENU
        </Typography>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {menuItems.map(
          (item) =>
            menuItems && (
              <FoodItem
                key={item.id}
                img={item.img}
                title={item.name}
                price={item.price}
                category={item.category}
                id={item.id}
                active={active}
              />
            )
        )}
      </div>
    </section>

  );
}

export default Menu;
