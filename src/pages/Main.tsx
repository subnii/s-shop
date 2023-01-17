import React from "react";
import ProductList from "../components/ProductList";

function Banner() {
  return (
    <section className="h-96 bg-yellow-900 relative">
      <div className="w-full h-full bg-cover bg-banner opacity-80" />
      <div className="absolute w-full top-32 text-center text-gray-50 drop-shadow-2xl">
        <h2 className="text-6xl">Love it, Live it</h2>
        <p className="text-2xl">LIFE STYLE SELECT SHOP</p>
      </div>
    </section>
  );
}

function Main() {
  return (
    <div className="sm:p-2">
      <Banner />
      <ProductList />
    </div>
  );
}

export default Main;
