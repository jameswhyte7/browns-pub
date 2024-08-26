import {
  IconButton,
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
import './Main.css'

const ORDER_DATA = {
  title: "",
  qty: 1,
  price: "",
  notes: "",
  id: "",
};

function FoodItem({ img, title, more, price, category, id, active }) {
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
      <Card className="w-full max-w-[17rem] mx-auto shadow-lg">
        <CardHeader floated={false} color="blue-gray">
          <img
            src={img}
            alt={title}
            style={{ objectFit: "cover" }}
            className="w-full h-[140px]"
          />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />

          {/* <IconButton
            size="sm"
            color="red"
            variant="text"
            className="!absolute top-0 right-0 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </IconButton> */}
        </CardHeader>
        <CardBody className="flex-grow pb-0">
          <div className="mb-0 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="font-smaller text-md">
              {title}
            </Typography>
            <Typography
              color="blue-gray"
              className="flex items-center gap-0.5 font-normal text-md bg-[#f4f3ef] p-0.5 rounded-md "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-0.5 h-3 w-3 text-yellow-700"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              GH¢{price}
            </Typography>
          </div>
          <Typography color="gray" className="text-xs">
            {more}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button onClick={handleOpen} size="sm" fullWidth={true} className="bg-[#080a0e] text-[#D3AC67]">
            Order Now
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
              min={0}
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
