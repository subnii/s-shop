import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import useCart from "../hooks/useCart";
import { useAuthContext } from "../context/AuthContext";
import { ICartProduct, IProduct } from "../types/productVo";

function ProductDetail() {
  const { user, login } = useAuthContext();
  const { addOrUpdateItem } = useCart();
  const {
    state: { product },
  } = useLocation();
  const { id, image, title, description, category, price, options } =
    product as IProduct;

  const [selected, setSelected] = useState(options && options[0]);
  const {
    cartQuery: { data: cartProducts },
  } = useCart();

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelected(e.target.value);

  const clickHandler = () => {
    if (user) {
      let product: ICartProduct = {
        id,
        image,
        title,
        price,
        option: selected,
        quantity: 0,
      };

      if (cartProducts && cartProducts?.length > 0) {
        const hasCartProduct = cartProducts.filter(
          (cartProduct) => cartProduct.id === product.id
        );

        if (hasCartProduct.length > 0) {
          product.quantity = hasCartProduct[0].quantity + 1;
        } else {
          product.quantity = 1;
        }
      }

      addOrUpdateItem.mutate(product, {
        onSuccess: () => {
          alert("장바구니에 추가되었습니다.");
        },
      });
    } else {
      login();
    }
  };

  return (
    <div className="sm:p-2">
      <p className="mt-4 text-gray-700">{category}</p>
      <section className="flex flex-col md:flex-row">
        <img className="w-full basis-7/12" src={image} alt={title} />
        <div className="w-full basis-5/12 flex flex-col px-4">
          <h2 className="text-3xl font-bold py-2">{title}</h2>
          <p className="text-2xl font-bold py-2 border-b border-dashed border-gray-400">
            ₩ {price.toLocaleString()}
          </p>
          <p className="py-4 text-lg border-b border-dashed border-gray-400">
            {description}
          </p>
          <div className="flex items-center py-4">
            <label className="mr-1 text-brand font-bold" htmlFor="select">
              옵션
            </label>
            <select
              id="select"
              className="p-2 flex-1 border border-gray-400 rounded-lg outline-none"
              onChange={selectHandler}
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>

          <Button
            text={user ? "장바구니에 추가" : "로그인 하기"}
            onClick={clickHandler}
          />
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
