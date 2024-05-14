import React, { useState } from "react";
import InputText from "../../../common/InputText";
import { Radio, Typography } from "@material-tailwind/react";

const ORDER_DATA = {
  name: "",
  phone: "",
  location: "",
  orders: [],
  createdAt: "",
};

function OrderForm() {
  const [formData, setFormData] = useState(ORDER_DATA);
  const [isDispatch, setIsDispatch] = useState(true);

  const updateFormValue = ({ updateType, value }) => {
    setFormData({ ...formData, [updateType]: value });
  };

  const handleRadioChange = (event) => {
    setIsDispatch(event.target.value === "dispatch");
  };

  return (
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

          {/* {isDispatch && (
            <div className="mt-4">
              <DeliveryLocation />
            </div>
          )} */}
        </div>
      </form>
    </div>
  );
}

export default OrderForm;
