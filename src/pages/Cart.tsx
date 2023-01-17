import React from "react";
import { FaEquals } from "react-icons/fa";
import useCart from "../hooks/useCart";
import {
  AiOutlinePlusCircle,
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
} from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import Button from "../components/Button";
import { useIamportPayment } from "../apis/iamport";
import { ICartItemProps } from "../types/productVo";

const SHIPPING = 3000;
const ICON_CLASS =
  "transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1";

function CartItem({ product }: ICartItemProps) {
  const { id, quantity, image, title, option, price } = product;
  const { addOrUpdateItem, removeItem } = useCart();
  const minusHandler = () => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };
  const plusHandler = () =>
    addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });

  const deleteHandler = () => removeItem.mutate(id);

  return (
    <li className="flex justify-between my-2 items-center">
      <img className="w-24 md:w-48 rounded-lg" src={image} alt={title} />
      <div className="flex-1 flex justify-between ml-4">
        <div className="basis-3/5">
          <p className="text-lg">{title}</p>
          <p className="text-xl font-bold text-brand">{option}</p>
          <p>₩ {price.toLocaleString()}</p>
        </div>
        <div className="text-2xl flex items-center gap-2">
          <AiOutlineMinusSquare className={ICON_CLASS} onClick={minusHandler} />
          <span>{quantity}</span>
          <AiOutlinePlusSquare className={ICON_CLASS} onClick={plusHandler} />
          <BsTrash className={ICON_CLASS} onClick={deleteHandler} />
        </div>
      </div>
    </li>
  );
}

function PriceCard({ text, price }: { text: string; price: number }) {
  return (
    <div className="mx-2 rounded-2xl text-center text-lg">
      <p>{text}</p>
      <p className="font-bold text-brand text-lg md:text-xl">
        ₩ {price.toLocaleString()}
      </p>
    </div>
  );
}

function Cart() {
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();

  const { iamportPayment } = useIamportPayment();

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + current.price * current.quantity,
      0
    );

  return (
    <section className="p-8 flex flex-col">
      <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">
        내 장바구니
      </p>
      {hasProducts ? (
        <>
          <ul className="mb-8 p-4 px-8">
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
          </ul>
          <div className="flex justify-between items-center mb-6 p-2 md:px-8 lg:px-16 border border-gray-300">
            <PriceCard text="상품 총액" price={totalPrice ? totalPrice : 0} />
            <AiOutlinePlusCircle className="shrink-0" />
            <PriceCard text="배송액" price={SHIPPING} />
            <FaEquals className="shrink-0" />
            <PriceCard
              text="총가격"
              price={totalPrice ? totalPrice + SHIPPING : SHIPPING}
            />
          </div>
          <div className="flex justify-end">
            <Button
              text="주문하기"
              onClick={iamportPayment.bind(
                null,
                totalPrice ? totalPrice + SHIPPING : SHIPPING
              )}
            />
          </div>
        </>
      ) : (
        <p>장바구니에 상품이 없습니다. 상품을 담아주세요.</p>
      )}
    </section>
  );
}

export default Cart;
