import React, { useEffect, useRef, useState } from "react";
import DashTop from "./components/DashTop";
import { Button, Typography } from "@material-tailwind/react";
import { Divider, message } from "antd";
import OrderItem from "./components/OrderItem";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import Statistic from "antd/es/statistic/Statistic";
import soundPlay from "../../assets/Short-notification-sound.mp3";
import { SETTINGS_ID } from "../../constants/constants";
import { useNavigate } from "react-router-dom";

function Dashboard({ active }) {
  const [itemsPerMonth, setItemsPerMonth] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  const [pendingOrder, setPendingOrder] = useState([]);
  const [prevData, setPrevData] = useState([]);

  const navigate = useNavigate();

  const audioRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const playPauseSound = () => {
    audioRef.current.play();
  };

  const handleActiveToggle = async () => {
    const collRef = collection(db, "settings");
    const docRef = doc(collRef, SETTINGS_ID);
    const docSnap = await getDoc(docRef);

    let docData = docSnap.data();
    await updateDoc(docRef, {
      active: docData.active === true ? false : true,
    });
    message.success("Shop Closed Successfully");
  };

  useEffect(() => {
    const fetchData = async () => {
      const itemsRef = collection(db, "orders");

      const today = new Date();
      const startDate = Timestamp.fromDate(
        new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0)
      );
      const endDate = Timestamp.fromDate(
        new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999)
      );

      const q = query(
        itemsRef,
        orderBy("createdAt"),
        where("createdAt", ">=", startDate),
        where("createdAt", "<=", endDate)
      );

      onSnapshot(q, (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const monthItems = newData.filter(
          (item) => item.isPaid === true && item.status === "complete"
        );
        setItemsPerMonth(monthItems);

        const total = monthItems.reduce(
          (total, item) => total + parseInt(item.total - item.delivery),
          0
        );
        setTotalAmount(total);

        const pendingItems = newData.filter(
          (item) => item.status === "pending" && item.isPaid
        );
        setPendingOrder(pendingItems);
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (prevData.length > 0) {
      if (pendingOrder.length > prevData.length) {
        try {
          const simulateClick = () => {
            const event = new MouseEvent("click");
            document.body.dispatchEvent(event);
          };
          simulateClick();

          document.body.addEventListener("click", playPauseSound());
          setPrevData(pendingOrder);

          return () => {
            document.body.removeEventListener("click", playPauseSound());
          };
        } catch (error) {
          console.error("Error playing sound:", error);
        }
      }
    } else {
      console.log("No show");
    }

    setPrevData(pendingOrder);
  }, [pendingOrder, prevData]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="overflow-scroll">
      <audio ref={audioRef} src={soundPlay} />

      {/* <Button onClick={playPauseSound}>Play</Button> */}

      <DashTop />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <div className="flex justify-between items-center">
          <Typography color="black" variant="h4" className="mb-8">
            Summary This Month
          </Typography>
          <Button onClick={handleActiveToggle} color={active ? "red" : "green"}>
            {active ? "Close Shop" : "Open Shop"}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Statistic title="Total Orders" value={itemsPerMonth.length || 0} />
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

        <Divider orientation="left">
          <Typography color="black" variant="h4">
            Pending Orders
          </Typography>
        </Divider>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {pendingOrder.length > 0 ? (
            pendingOrder.map((pending) => (
              <OrderItem key={pending.id} {...pending} />
            ))
          ) : (
            <div className="text-center">
              <Typography color="black" variant="h3">
                No Pending Order
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
