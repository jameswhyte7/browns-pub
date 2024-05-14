import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

const useFetch = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const dbref = collection(db, "menu");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(dbref);
        const data = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setFoods(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { foods, setFoods, loading, setLoading };
};

export default useFetch;
