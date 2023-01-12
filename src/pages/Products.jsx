import React from "react";
import ProductList from "../components/ProductList";

function Products() {
  return (
    <>
      <h2 className="text-2xl font-bold my-4 text-center">전체 상품</h2>
      <ProductList />
    </>
  );
}

export default Products;
