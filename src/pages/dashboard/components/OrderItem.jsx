import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Divider, message } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../../config/firebase";

function OrderItem({ name, phone, location, items, id }) {
  const handleAction = async (id, value) => {
    try {
      const itemRef = doc(db, "orders", id);
      await updateDoc(itemRef, { status: value });
    } catch (error) {
      message.error(error.errors.message);
    }
  };

  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <div className="mb-2">
          <Typography color="black">Name</Typography>
          <Typography color="black" variant="h5">
            {name}
          </Typography>
        </div>
        <div className="mb-2">
          <Typography color="black">Phone</Typography>
          <Typography color="black" variant="h5">
            {phone}
          </Typography>
        </div>
        <div className="mb-2">
          <Typography color="black">Location</Typography>
          <Typography color="black" variant="h5">
            {location}
          </Typography>
        </div>

        {items.map((item) => (
          <div key={item.id}>
            <Divider />

            <Typography color="black" variant="h5">
              {item.title}
            </Typography>
            <Typography color="black">
              QTY: <strong>{item.qty}</strong>
            </Typography>
            <Typography color="black">
              Notes: <strong>{item?.notes}</strong>
            </Typography>
          </div>
        ))}
      </CardBody>
      <CardFooter>
        <Button
          fullWidth
          color="green"
          className="mb-2"
          onClick={() => handleAction(id, "complete")}
        >
          Complete Order
        </Button>
        <Button
          fullWidth
          color="red"
          onClick={() => handleAction(id, "cancel")}
        >
          Cancel Order
        </Button>
      </CardFooter>
    </Card>
  );
}

export default OrderItem;
