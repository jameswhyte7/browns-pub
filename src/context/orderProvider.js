import { useEffect, useState } from "react";

const useOrderProvider = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem("order"));
    if (savedOrder && savedOrder.length > 0) {
      setOrder(savedOrder);
    }
  }, []);

  const handleOrder = (food) => {
    const itemIndex = order.findIndex((x) => x.id === food.id);

    if (itemIndex !== -1) {
      const updatedOrder = [...order];
      updatedOrder[itemIndex] = { ...updatedOrder[itemIndex], qty: food.qty };
      localStorage.setItem("order", JSON.stringify(updatedOrder));
      setOrder(updatedOrder);
    } else {
      const updatedOrder = [...order, food];
      localStorage.setItem("order", JSON.stringify(updatedOrder));
      setOrder(updatedOrder);
    }
  };

  const removeOrder = (id) => {
    const updatedOrder = order.filter((item) => item.id !== id);
    localStorage.setItem("order", JSON.stringify(updatedOrder));
    setOrder(updatedOrder);
  };

  return { order, handleOrder, removeOrder };
};

export default useOrderProvider;
