import React from "react";
import OrderProvider from "../../../context/orderProvider";
import { Button } from "@material-tailwind/react";

function OrderPrice() {
  const { order } = OrderProvider();

  let allPrice = 0;
  for (var i = 0; i < order.length; i++) {
    allPrice += order[i].price * order[i].qty;
  }

  const subTotal = parseFloat(allPrice.toFixed(2));
  const deliveryFee = parseFloat((allPrice % 20).toFixed(2));
  const total = parseFloat((subTotal + deliveryFee).toFixed(2));

  const config = {
    reference: `${title}-${new Date().getTime().toString()}`,
  };

  return (
    <>
      <div className="flex flex-col space-y-3 my-4">
        <div className="flex items-center">
          <span className="flex-grow poppins text-gray-700">Subtotal</span>
          <span className="poppins font-semibold text-black">${subTotal}</span>
        </div>
        <div className="flex items-center">
          <span className="flex-grow poppins text-gray-700">Delivery Fee</span>
          <span className="poppins font-semibold text-black">
            ${deliveryFee}
          </span>
        </div>
        <div className="flex items-center">
          <span className="flex-grow poppins text-gray-700 text-xl">Total</span>
          <span className="poppins font-semibold text-black text-xl">
            ${total}
          </span>
        </div>
      </div>
      <div className="mt-12">
        <Button fullWidth color="amber">
          Pay now
        </Button>
      </div>
    </>
  );
}

export default OrderPrice;
