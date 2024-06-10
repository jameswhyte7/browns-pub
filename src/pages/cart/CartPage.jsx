import React, { useEffect, useState } from "react";
import useOrderProvider from "../../context/orderProvider";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Radio,
  Typography,
} from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeNav from "../home/components/HomeNav";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Divider, message, Select } from "antd";
import InputText from "../../common/InputText";
import { usePaystackPayment } from "react-paystack";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { DeliveryPrices } from "../../data/deliveryPrices";
import AddNewPage from "./components/AddNewPage";
import Footer from "../home/Footer";

const ORDER_DATA = {
  name: "",
  phone: "",
  location: "",
  orders: [],
  createdAt: "",
};

function CartPage() {
  const [formData, setFormData] = useState(ORDER_DATA);
  const [isDispatch, setIsDispatch] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [delivery, setDelivery] = useState({ value: "", price: 0 });
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const { order, removeOrder } = useOrderProvider();

  const updateFormValue = ({ updateType, value }) => {
    setFormData({ ...formData, [updateType]: value });
  };

  const handleModal = () => setOpenModal(!openModal);
  const handleNavigate = () => navigate("/");

  const handleRadioChange = (event) => {
    setIsDispatch(event.target.value === "dispatch");
  };

  const handleLocationSelect = (value) => {
    const getObject = DeliveryPrices.find((item) => item.value === value);
    setDelivery({ value: getObject.value, price: getObject.price });
  };

  const navigate = useNavigate();

  let allPrice = 0;
  for (var i = 0; i < order.length; i++) {
    allPrice += order[i].price * order[i].qty;
  }

  const subTotal = parseInt(allPrice);
  const deliveryFee = isDispatch ? parseInt(delivery.price) : 0;
  const total = parseInt(subTotal) + parseInt(deliveryFee);
  const percentage = parseFloat(total * 0.02);
  const amountPayable = (total + percentage) * 100;

  const config = {
    reference: `${formData.phone}-${new Date().getTime().toString()}`,
    email: `user${formData.phone}@email.com`,
    amount: parseInt(amountPayable),
    publicKey: "pk_test_58c6351421f9e2746c30799f4e28ab06d208cc30",
    // publicKey: "pk_live_4b6f0aff8e2146cd24ccbd2c4f86fdf9915202de",
    currency: "GHS",
  };

  const handleDocUpdate = async (id) => {
    try {
      const q = query(collection(db, "orders"), where("reference", "==", id));
      const snapshot = await getDocs(q);

      const doc = snapshot.docs[0];
      const docRef = doc.ref;

      await updateDoc(docRef, { isPaid: true }).then((val) =>
        console.log("Hello Done", val)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSuccess = () => setSuccessModal(!successModal);

  const onSuccess = (reference) => {
    message.success("paynent  success");
    handleDocUpdate(reference.reference);
    setLoading(false);
    localStorage.clear("orders");
    setSuccessModal(true);
  };

  const onClose = () => {
    setLoading(false);
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);

  const handleSubmit = async () => {
    if (formData.name === "") {
      message.error("Plase provide your name");
      return;
    } else if (formData.phone === "") {
      message.error("Plase provide a phone number");
      return;
    } else if (isDispatch && delivery.price === 0) {
      message.error("Plase select your nearest location");
      return;
    }

    setLoading(true);

    const sendData = {
      name: formData.name,
      phone: formData.phone,
      delivery: isDispatch ? delivery.price : 0,
      location: isDispatch ? delivery.value : null,
      isPaid: false,
      total,
      items: order,
      status: "pending",
      createdAt: new Date(),
      reference: config.reference,
    };

    try {
      console.log('<-------------------data-------------------->', sendData)
      const colRef = collection(db, "orders");
      await addDoc(colRef, sendData);
      initializePayment(onSuccess, onClose);
    } catch (error) {
      console.log(error);
      message.error(error.message);
      setLoading(false);
    }
  };

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <main className="banner pb-30">
        {/* <HomeNav /> */}
        <div className="max-w-screen-xl py-20 mx-auto px-6">
          <div className="flex justify-between align-center">
            <Button color="amber" onClick={() => navigate("/")}>
              Go Back
            </Button>
            <Button color="green" onClick={handleModal}>
              + Add New Item
            </Button>
          </div>
          {order.length < 1 ? (
            <div className="pt-24">
              <h1 className="text-center text-5xl text-primary poppins">
                No order added yet!
              </h1>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
              <div className="col-span-1">
                <div className="flex flex-col ">
                  <form>
                    <InputText
                      defaultValue={formData.name}
                      updateType="name"
                      containerStyle="mt-4"
                      labelTitle="Name"
                      updateFormValue={updateFormValue}
                      required
                    />
                    <InputText
                      defaultValue={formData.phone}
                      updateType="phone"
                      containerStyle="mt-4"
                      labelTitle="Phone #"
                      updateFormValue={updateFormValue}
                      required
                    />

                    <div className={`flex flex-col flex-1 mb-5 mt-4`}>
                      <Typography
                        color="black"
                        variant="paragraph"
                        className="text-left w-full"
                      >
                        <span className="uppercase font-bold text-sm detail-title">
                          Delivery Type
                        </span>
                      </Typography>

                      <div className="flex gap-10">
                        <Radio
                          name="type"
                          label="Dispatch"
                          value="dispatch"
                          checked={isDispatch}
                          onChange={handleRadioChange}
                        />
                        <Radio
                          name="type"
                          label="Pick up"
                          value="pick-up"
                          onChange={handleRadioChange}
                        />
                      </div>

                      {isDispatch && (
                        <div className="mt-4">
                          <Select
                            showSearch
                            placeholder="Select Delivery Location"
                            onChange={handleLocationSelect}
                            options={DeliveryPrices}
                            size="large"
                            style={{ width: "100%" }}
                          />
                          {/* <Select
                          label="Select Delivery Location"
                          value={delivery}
                          onChange={(val) => setDelivery(val)}
                        >
                          {deliveryPrices.map((item) => (
                            <Option key={item.id} value={item}>
                              {item.name}
                            </Option>
                          ))}
                        </Select> */}
                        </div>
                      )}
                    </div>
                  </form>
                </div>
                {/* <OrderForm /> */}
              </div>

              <div className="col-span-1">
                <div className=" flex flex-col space-y-3 overflow-y-scroll orderContainer ">
                  <Typography color="black" variant="h4">
                    Order Items
                  </Typography>
                  {order.map((x) => (
                    <div key={x.id}>
                      <div className="h-16 line-clamp-2">
                        <Typography variant="h4" color="blue-gray">
                          {x.title}
                        </Typography>
                      </div>

                      <div className="flex justify-between">
                        <Typography color="amber" variant="h5">
                          GH¢{x.price.toFixed(2)}
                        </Typography>
                        <div className="flex gap-4">
                          <span className="text-lg text-gray-700 select-none">
                            {x.qty} items
                          </span>
                          <RiDeleteBin6Line
                            color="red"
                            className="w-6 h-6 text-gray-600 transform transition hover:scale-105 duration-500 cursor-pointer"
                            onClick={() => removeOrder(x.id)}
                          />
                        </div>
                      </div>

                      <Divider />
                    </div>
                  ))}
                </div>
                <>
                  <div className="flex flex-col space-y-3 my-4">
                    <div className="flex items-center">
                      <span className="flex-grow poppins text-gray-700">
                        Subtotal
                      </span>
                      <span className="poppins font-semibold text-black">
                        GH¢ {subTotal}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="flex-grow poppins text-gray-700">
                        Delivery Fee
                      </span>
                      <span className="poppins font-semibold text-black">
                        GH¢ {isDispatch ? delivery.price || 0 : 0}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="flex-grow poppins text-gray-700 text-xl">
                        Total
                      </span>
                      <span className="poppins font-semibold text-black text-xl">
                        GH¢ {total}
                      </span>
                    </div>
                  </div>
                  <div className="mt-12">
                    <Button
                      fullWidth
                      color="amber"
                      onClick={() => handleSubmit()}
                      loading={loading}
                    >
                      Pay now
                    </Button>
                  </div>
                </>
                {/* <OrderPrice {...order} /> */}
              </div>
            </div>
          )}
        </div>

        {openModal && <AddNewPage open={openModal} handler={handleModal} />}
        {successModal && (
          <Dialog open={successModal} handler={handleSuccess}>
            <DialogHeader className="text-center">
              <Typography variant="h5" color="blue-gray">
                Order Successfully Placed
              </Typography>
            </DialogHeader>
            <DialogBody divider className="grid place-items-center gap-4">
              <svg
                width="64px"
                height="64px"
                viewBox="0 0 117 117"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title></title> <desc></desc> <defs></defs>{" "}
                  <g
                    fill="none"
                    fill-rule="evenodd"
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                  >
                    {" "}
                    <g fill-rule="nonzero" id="correct">
                      {" "}
                      <path
                        d="M34.5,55.1 C32.9,53.5 30.3,53.5 28.7,55.1 C27.1,56.7 27.1,59.3 28.7,60.9 L47.6,79.8 C48.4,80.6 49.4,81 50.5,81 C50.6,81 50.6,81 50.7,81 C51.8,80.9 52.9,80.4 53.7,79.5 L101,22.8 C102.4,21.1 102.2,18.5 100.5,17 C98.8,15.6 96.2,15.8 94.7,17.5 L50.2,70.8 L34.5,55.1 Z"
                        fill="#17AB13"
                        id="Shape"
                      ></path>{" "}
                      <path
                        d="M89.1,9.3 C66.1,-5.1 36.6,-1.7 17.4,17.5 C-5.2,40.1 -5.2,77 17.4,99.6 C28.7,110.9 43.6,116.6 58.4,116.6 C73.2,116.6 88.1,110.9 99.4,99.6 C118.7,80.3 122,50.7 107.5,27.7 C106.3,25.8 103.8,25.2 101.9,26.4 C100,27.6 99.4,30.1 100.6,32 C113.1,51.8 110.2,77.2 93.6,93.8 C74.2,113.2 42.5,113.2 23.1,93.8 C3.7,74.4 3.7,42.7 23.1,23.3 C39.7,6.8 65,3.9 84.8,16.2 C86.7,17.4 89.2,16.8 90.4,14.9 C91.6,13 91,10.5 89.1,9.3 Z"
                        fill="#4A4A4A"
                        id="Shape"
                      ></path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
              {/* <Typography className="text-center font-normal">
                ${title}will be in touch with you shortly regarding your order.
                In the meantime, feel free to explore the delicious options
                available on our menu!
              </Typography> */}
            </DialogBody>
            <DialogFooter>
              <Button onClick={handleNavigate}>Proceed</Button>
            </DialogFooter>
          </Dialog>
        )}
      </main>

      <Footer />
    </>
  );
}

export default CartPage;
