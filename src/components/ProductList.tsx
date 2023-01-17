import React from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { IProduct } from "../types/productVo";

function ProductCard({ product }: { product: IProduct }) {
  const navigate = useNavigate();
  const { id, image, title, category, price } = product;
  return (
    <li
      onClick={() => {
        navigate(`/detail/${id}`, { state: { product } });
      }}
      className="rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105"
    >
      <img className="w-full" src={image} alt={title} />
      <div className="mt-2 px-2 text-lg flex justify-between items-center">
        <h3 className="truncate">{title}</h3>
        <p>{`₩ ${price.toLocaleString()}`}</p>
      </div>
      <p className="mb-2 px-2 text-gray-600">{category}</p>
    </li>
  );
}

function ProductList() {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 py-4">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}

export default ProductList;
