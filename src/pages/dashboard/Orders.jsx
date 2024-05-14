import React, { useEffect, useState } from "react";
import DashTop from "./components/DashTop";
import { DatePicker, Divider, message } from "antd";
import { Typography } from "@material-tailwind/react";
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import Statistic from "antd/es/statistic/Statistic";
import SummaryItem from "./components/SummaryItem";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

const today = new Date();
const currentMonth = today.getMonth();

const firstDay = new Date(today.getFullYear(), currentMonth, 1);
const lastDay = new Date(today.getFullYear(), currentMonth + 1, 0);

function Orders() {
  const [dates, setDates] = useState([firstDay, lastDay]);
  const [orderItems, setOrderItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const onDateSelect = (value) => {
    const firstItem = new Date(value[0]);
    const secondItem = new Date(value[1]);

    setDates([firstItem, secondItem]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const startTimestamp = Timestamp.fromDate(dates[0]);
      const endTimestamp = Timestamp.fromDate(dates[1]);

      const q = query(
        collection(db, "orders"),
        where("createdAt", ">=", startTimestamp),
        where("createdAt", "<=", endTimestamp)
      );

      try {
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());

        const monthItem = data.filter(
          (item) => item.isPaid === true && item.status === "complete"
        );
        setOrderItems(monthItem);

        const total = monthItem.reduce(
          (total, item) => total + parseInt(item.total - item.delivery),
          0
        );
        setTotalAmount(total);
      } catch (error) {
        message.error(error.errors.message);
      }
    };

    fetchData();
  }, [dates]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="overflow-scroll">
      <DashTop />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <Typography color="black" variant="h5" className="mb-4">
          Choose Date Range
        </Typography>
        <RangePicker size="large" onChange={onDateSelect} />

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4 my-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Statistic title="Total Orders" value={orderItems.length || 0} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Statistic title="Total Amount" value={totalAmount || 0} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Statistic
              title="Amount Receivable"
              value={(totalAmount * 0.8).toFixed(2) || 0}
            />
          </div>
        </div>

        <Divider orientation="left">ORDER ITEMS</Divider>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {orderItems.length > 0 ? (
            orderItems.map((item) => <SummaryItem key={item.id} {...item} />)
          ) : (
            <div className="text-center">
              <Typography color="black" variant="h3">
                No orders to display
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
