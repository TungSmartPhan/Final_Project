import { useState, useEffect } from "react";
import axios from "axios";

function CategoriesAPI() {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("/api/category");
        console.log(res);
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, [callback]);
  console.log("categories: ", categories.length);
  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
  };
}

export default CategoriesAPI;
