import { useState } from "react";
import FoodSkeleton from "./FoodSkeleton";
import FoodItem from "./FoodItem";
import useFetch from "../../../hooks/useFetch";
import { Typography } from "@material-tailwind/react";
import { menuItems } from "../../../data/menu";

function Menu({ active }) {
  const [menuTab, setMenuTab] = useState("all");
  // const { foods, loading } = useFetch();

  const filteredFoods =
    menuTab === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === menuTab);

  const handleMenuTabs = (type) => {
    setMenuTab(type);
  };

  return (
    <section id="sectionmenu" className="my-12 max-w-screen-xl mx-auto px-6">
      <div className="text-center mb-8">
        <Typography color="black" variant="h4">
          Our Menu
        </Typography>
      </div>

      {menuItems.length < 1 ? (
        <FoodSkeleton />
      ) : menuItems ? (
        <>
          {/* <div className="flex flex-wrap items-center justify-center space-x-6">
            <p
              className={
                menuTab === "all" ? "active_menu_tab bg-primary" : "menu_tab"
              }
              onClick={() => handleMenuTabs("all")}
            >
              All
            </p>
            <p
              className={
                menuTab === "starters"
                  ? "active_menu_tab bg-primary"
                  : "menu_tab"
              }
              onClick={() => handleMenuTabs("starters")}
            >
              Starters
            </p>
            <p
              className={
                menuTab === "salads" ? "active_menu_tab bg-primary" : "menu_tab"
              }
              onClick={() => handleMenuTabs("salads")}
            >
              Salads
            </p>
            <p
              className={
                menuTab === "sandwiches"
                  ? "active_menu_tab bg-primary"
                  : "menu_tab"
              }
              onClick={() => handleMenuTabs("sandwiches")}
            >
              Sandwiches
            </p>
            <p
              className={
                menuTab === "shawarma"
                  ? "active_menu_tab bg-primary"
                  : "menu_tab"
              }
              onClick={() => handleMenuTabs("shawarma")}
            >
              Shawarma
            </p>
            <p
              className={
                menuTab === "wraps" ? "active_menu_tab bg-primary" : "menu_tab"
              }
              onClick={() => handleMenuTabs("wraps")}
            >
              Wraps
            </p>
            <p
              className={
                menuTab === "noodles"
                  ? "active_menu_tab bg-primary"
                  : "menu_tab"
              }
              onClick={() => handleMenuTabs("noodles")}
            >
              Noodles
            </p>
            <p
              className={
                menuTab === "rice" ? "active_menu_tab bg-primary" : "menu_tab"
              }
              onClick={() => handleMenuTabs("rice")}
            >
              Rice
            </p>
            <p
              className={
                menuTab === "branch" ? "active_menu_tab bg-primary" : "menu_tab"
              }
              onClick={() => handleMenuTabs("branch")}
            >
              Branch
            </p>
            <p
              className={
                menuTab === "coffee / tea"
                  ? "active_menu_tab bg-primary"
                  : "menu_tab"
              }
              onClick={() => handleMenuTabs("coffee / tea")}
            >
              Coffee / Tea
            </p>
            <p
              className={
                menuTab === "premium shakes"
                  ? "active_menu_tab bg-primary"
                  : "menu_tab"
              }
              onClick={() => handleMenuTabs("premium shakes")}
            >
              Premium Shakes
            </p>
            <p
              className={
                menuTab === "smoothies"
                  ? "active_menu_tab bg-primary"
                  : "menu_tab"
              }
              onClick={() => handleMenuTabs("smoothies")}
            >
              Smoothies
            </p>
          </div> */}
          <div className="flex flex-wrap items-center justify-center space-x-6">
            {[
              "All",
              "Starters",
              "Salads",
              "Sandwiches",
              "Shawarma",
              "Wraps",
              "Noodles",
              "Rice",
              "Brunch",
              "Coffee / Tea",
              "Premium Shakes",
              "Smoothies",
            ].map((item) => (
              <p
                key={item}
                className={`my-2 ${
                  menuTab === item.toLowerCase()
                    ? "active_menu_tab bg-primary"
                    : "menu_tab"
                }`}
                onClick={() => handleMenuTabs(item.toLowerCase())}
              >
                {item}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
            {filteredFoods.map(
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
        </>
      ) : null}
    </section>
  );
}

export default Menu;
