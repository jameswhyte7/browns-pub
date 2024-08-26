import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Divider } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";
import { Timestamp } from "firebase/firestore"; // Import Timestamp from firebase/firestore

function SummaryItem({
  name,
  phone,
  location,
  items,
  status,
  total,
  delivery,
  createdAt,
}) {
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
          <Typography color="black">Total</Typography>
          <Typography color="black" variant="h5">
            GH¢{parseInt(total) - parseInt(delivery)}.00
          </Typography>
        </div>

        <div className="mb-2">
          <Typography color="black">Date</Typography>
          <Typography color="black" variant="h5">
            {dayjs(createdAt.seconds * 1000).format("MMMM DD, YYYY")}
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

SummaryItem.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      qty: PropTypes.number.isRequired,
      notes: PropTypes.string,
    })
  ).isRequired,
  status: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  delivery: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Timestamp).isRequired, // Ensure Timestamp is used here
};

export default SummaryItem;
