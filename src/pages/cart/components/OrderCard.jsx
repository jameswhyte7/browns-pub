import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import useOrderProvider from "../../../context/orderProvider";
import { Typography } from "@material-tailwind/react";

function OrderCard(props) {
  const { removeOrder } = useOrderProvider();

  return (
    <div className="rounded-lg p-4 flex space-x-3">
      <div className="flex">
        <img className="w-24 object-contain" src={props.img} alt="" />
      </div>
      <div className="flex flex-col space-y-3 flex-grow">
        <Typography variant="h4">{props.title}</Typography>
        <h1 className="font-semibold text-lg text-primary">
          GH¢{props.price.toFixed(2)}
        </h1>
      </div>

      <div className="flex items-center px-4 py-2 space-x-3">
        <span className="text-lg text-gray-700 select-none">
          {props.qty} items
        </span>
      </div>

      <div className="flex flex-col items-center justify-center">
        <RiDeleteBin6Line
          className="w-6 h-6 text-gray-600 transform transition hover:scale-105 duration-500 cursor-pointer"
          onClick={() => removeOrder(props.id)}
        />
      </div>
    </div>
  );
}

export default OrderCard;
