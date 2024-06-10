import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Home from "./pages/home/Home";
import CartPage from "./pages/cart/CartPage";
import SignIn from "./pages/auth/SignIn";
import Dashboard from "./pages/dashboard/Dashboard";
import Orders from "./pages/dashboard/Orders";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import { SETTINGS_ID } from "./constants/constants";

function App() {
  const [active, setActive] = useState(false);

  const docRef = doc(db, "settings", SETTINGS_ID);

  const getSettings = () => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      if (snap.exists) {
        setActive(snap.data().active);
      }
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home active={active} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<SignIn />} />
        <Route path="/home" element={<Dashboard active={active} />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
