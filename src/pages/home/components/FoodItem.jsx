import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
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
    setFormData({ ...formData, [updateType]: value });
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
      <Card className="max-w-[24rem] overflow-hidden transition transform duration-700">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <div className="image-container">
            <img
              src={img}
              alt={title}
              className="w-full h-[300px] transform transition duration-300"
              style={{ objectFit: "cover" }}
            />
          </div>
          <Chip value={category} className="absolute top-2 right-2" />
        </CardHeader>
        <CardBody>
          <div>
            <Typography
              variant="h4"
              color="blue-gray"
              style={{ fontSize: "clamp(1.2rem, 0.8rem, 0.5rem)" }}
            >
              {title}
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="flex items-center justify-between">
          <Typography variant="h4" color="amber">
            GH¢{price}
          </Typography>
          <Button color="amber" onClick={handleOpen} disabled={!active}>
            Buy Now
          </Button>
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
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleNewOrder()}
          >
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
