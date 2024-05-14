import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Divider } from "antd";
import React from "react";

function SummaryItem({ name, phone, location, items, status }) {
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

        <div className="mb-2">
          <Typography color="black">Status:</Typography>
          <Typography
            color={
              status === "pending"
                ? "blue"
                : status === "complete"
                ? "green"
                : "red"
            }
            variant="h5"
          >
            {status}
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
    </Card>
  );
}

export default SummaryItem;
