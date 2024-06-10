import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DetailItem from "../../../common/DetailItem";
import InputText from "../../../common/InputText";
import InputArea from "../../../common/InputArea";
import useOrderProvider from "../../../context/orderProvider";
import { FloatButton } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "../../../App.css";
import './FoodItem.css'

const ORDER_DATA = {
  title: "",
  qty: 1,
  price: "",
  notes: "",
  id: "",
};

function FoodItem({ img, title, price, category, id, active }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(ORDER_DATA);

  const { handleOrder, order } = useOrderProvider();

  const navigate = useNavigate();

  const updateFormValue = ({ updateType, value }) => {
    if (updateType === "qty") {
      value = Math.max(0, value); // Ensure qty is non-negative
    }
    setFormData((prevData) => ({ ...prevData, [updateType]: value }));
  };

  const handleOpen = () => setOpen(!open);

  const handleNewOrder = () => {
    const newOrder = {
      title,
      price,
      total: parseInt(price) * formData.qty,
      img,
      id,
      qty: parseInt(formData.qty),
      notes: formData.notes.trim() !== "" ? formData.notes.trim() : undefined,
    };

    handleOrder(newOrder);
    setOpen(!open);
    navigate("/cart");
  };

  return (
    <>
      <Card
        style={{ border: "#D0AE64 1px solid ", boxShadow: "2px 2px 30px rgba(0, 0, 0, 0.25)" }}
        className="max-w-[18rem] overflow-hidden"
      >
        <CardHeader floated={false} shadow={false} className="m-0 rounded-none">
          <div className="flex justify-center image-container">
            <img
              src={img}
              alt={title}
              className="w-full h-[140px]"
              style={{ objectFit: "cover" }}
            />
          </div>
        </CardHeader>
        <CardBody className="flex flex-col justify-between h-[60px]">
          <Typography
            variant="h2"
            color="blue-gray"
            style={{ fontSize: "clamp(0.8rem, 0.5rem, 0.25rem)" }}
            className="text-center"
          >
            {title}
          </Typography>
        </CardBody>
        <CardFooter className="mt-auto">
          <div className="w-full flex justify-between items-center h-4">
            <Typography className="text-center h-3 w-10 text-lg"
              variant="" color="black">
              GH¢{price}
            </Typography>
            <button className="button" onClick={handleOpen}>
              Order Now
            </button>
          </div>
        </CardFooter>
      </Card>


      <Dialog open={open} size="xs" handler={handleOpen}>
        <DialogHeader>Add To Cart</DialogHeader>
        <DialogBody>
          <form>
            <DetailItem title="Item" item={title} />
            <InputText
              type="number"
              defaultValue={formData.qty}
              updateType="qty"
              containerStyle="mt-4"
              labelTitle="Quantity"
              updateFormValue={updateFormValue}
              required={true}
              min={0} // Add the min prop here
            />
            <InputArea
              defaultValue={formData.notes}
              updateType="notes"
              containerStyle="mt-4"
              labelTitle="Notes"
              updateFormValue={updateFormValue}
            />
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleNewOrder}>
            <span>Proceed</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {order.length > 0 && (
        <FloatButton
          onClick={() => navigate("/cart")}
          badge={{ count: order.length }}
          icon={<ShoppingCartOutlined />}
        />
      )}
    </>
  );
}

export default FoodItem;
