import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Filters() {
  const state = useContext(AuthContext);
  const categories = state.APIState.categoriesAPI.categories;
  console.log('categoriesState: ', categories);

  const [category, setCategory] = state.APIState.productsAPI.category;
  const [sort, setSort] = state.APIState.productsAPI.sort;
  const [search, setSearch] = state.APIState.productsAPI.search;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    //khi người dùng chọn 1 danh mục category nào đấy, ta nên reset lại state search
    setSearch("");
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filter: </span>
        <select name="category" value={category} onChange={handleCategory}>
          <option value="">All Products</option>
          {Array.isArray(categories) && // Check if categories is an array
            categories.map((category) => (
              <option value={"category=" + category._id} key={category._id}>
                {category.name ? category.name : "Not Available"}
              </option>
            ))}
        </select>
      </div>
      {/* search */}
      <input
        type="text"
        value={search}
        placeholder="Enter your search!"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      {/* sort */}
      <div className="row">
        <span>Sort By: </span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">All Products</option>
          {/* <option></option>     */}
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best Sales</option>
          <option value="sort=-price">Price: Hight-Low</option>
          <option value="sort=price">Price: Low-Height</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
