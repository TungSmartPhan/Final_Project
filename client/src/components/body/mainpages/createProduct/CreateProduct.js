import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../utils/loading/Loading";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description:
    "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
  content:
    "Welcome to Suri Glaxy Store. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
  category: "",
  _id: "",
};

function CreateProduct() {
  const state = useContext(AuthContext);
  const [categories] = state.APIState.categoriesAPI.categories;
  const [tokenUser] = state.APIState.tokenAPI;
  const [product, setProduct] = useState(initialState);
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAdmin] = state.APIState.userAPI.isAdmin;
  const handleUpload = async (event) => {
    event.preventDefault();
    try {
      if (!isAdmin) return alert("You are not an Admin");
      const file = event.target.files[0];

      if (!file) return alert("File not exist");
      if (file.size > 1024 * 1024)
        //1mb
        return alert("Size too large!");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        //1mb
        return alert("File format is incorrect.");

        let formData = new FormData()
            formData.append('file',  file)
            formData.append("upload_preset", "ml_default")
 
            for (var key of formData.entries()) {
              console.log(key[0] + ', ' + key[1]);
          }
            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: tokenUser}
            })
            setLoading(false)
            // setImages(res.data)
            console.log(res);
    } catch (error) {
      alert(error.message);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };

  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        <div id="file_img" styles={styleUpload}>
          <img src="" alt="" />
          <span>X</span>
        </div>
      </div>

      <form>
        <div className="row">
          <label htmlFor="product_id">Product ID</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
          />
        </div>

        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title}
          />
        </div>

        <div className="row">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={product.price}
          />
        </div>

        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea
            type="textr"
            name="description"
            id="description"
            required
            value={product.description}
            rows="5"
          />
        </div>

        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={product.content}
            rows="7"
          />
        </div>

        <div className="row">
          <label htmlFor="categories">Categories: </label>
          <select name="category" value={product.category}>
            <option value="">Please select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateProduct;
