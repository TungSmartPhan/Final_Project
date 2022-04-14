import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";

function Categories() {
  const state = useContext(AuthContext);
  const [categories, setCategories] = state.APIState.categoriesAPI.categories;
  const [callback, setCallback] = state.APIState.categoriesAPI.callback;
  const [category, setCategory] = useState("");
  const [tokenUser] = state.APIState.tokenAPI;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");
  //   const handleChange = (e) => {
  //     setCategory({ ...category, [e.target.name]: e.target.value });
  //   };
  //thay vì ta có cách viết như trên , ta có một cách viết khác theo đúng javascript để dễ giải thích hơn. Đó là sử dụng thẳng event handler trực tiếp ngay bên trong các thuộc tính của JSX Element (hay gọi thuần là HTML)
  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: tokenUser },
          }
        );
        toast(res.message, {
          className: "toast-success",
          bodyClassName: "toast-success",
        });
      } else {
        const res = await axios.post(
          "/api/category",
          { name: category },
          {
            headers: { Authorization: tokenUser },
          }
        );
        console.log(res);
        toast(res.message, {
          className: "toast-success",
          bodyClassName: "toast-success",
        });
      }
      setCallback(!callback);
      setCategory("");
      setOnEdit(false);
    } catch (error) {
      toast(error.message, {
        className: "toast-failded",
        bodyClassName: "toast-failed",
      });
    }
  };

  //id và name là đối số từ (category._id, category.name)
  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };
  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: tokenUser },
      });
      toast(res.message, {
        className: "toast-success",
        bodyClassName: "toast-success",
      });
      setCallback(!callback);
    } catch (error) {
      toast(error.message, {
        className: "toast-failded",
        bodyClassName: "toast-failed",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="categories">
        <form onSubmit={createCategory}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          />
          <button type="submit">{onEdit ? "Update" : "Create"}</button>
        </form>

        <div className="col">
          {categories.map((category) => (
            <div className="row" key={category._id}>
              <p>{category.name}</p>
              <div>
                <button
                  onClick={() => editCategory(category._id, category.name)}
                >
                  Edit
                </button>
                <button onClick={() => deleteCategory(category._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
