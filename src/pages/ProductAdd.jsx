import React, { useState } from "react";
import { uploadImage } from "../apis/uploader";
import Button from "../components/Button";
import useProducts from "../hooks/useProducts";

function ProductAdd() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const { addProduct } = useProducts();

  const inputHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      console.log(files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const buttonHandler = () => {
    uploadImage(file)
      .then((url) => {
        addProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              alert("성공적으로 제품이 추가되었습니다.");
            },
          }
        );
      })
      .finally(() => {
        setProduct({});
        setFile(null);
        setIsUploading(false);
      });
  };

  return (
    <section className="w-full text-center flex flex-col">
      <h2 className="text-2xl font-bold my-4">새로운 제품 등록</h2>
      <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-center lg:items-start py-3">
        {file ? (
          <div className="w-96 h-96 overflow-hidden relative">
            <img
              className="w-full h-full object-cover sm:mb-2 p-2 border border-gray-300 rounded-lg"
              src={URL.createObjectURL(file)}
              alt="local file"
            />
          </div>
        ) : (
          <>
            <input
              type="file"
              className="w-96 h-96"
              accept="image/*"
              name="file"
              required
              onChange={inputHandler}
            />
          </>
        )}

        <div className="w-96 flex flex-col lg:px-3">
          <input
            type="text"
            name="title"
            value={product.title ?? ""}
            placeholder="제품명"
            required
            onChange={inputHandler}
          />
          <input
            type="number"
            name="price"
            value={product.price ?? ""}
            placeholder="가격"
            required
            onChange={inputHandler}
          />
          <input
            type="text"
            name="category"
            value={product.category ?? ""}
            placeholder="카테고리"
            required
            onChange={inputHandler}
          />
          <input
            type="text"
            name="description"
            value={product.description ?? ""}
            placeholder="제품 설명"
            required
            onChange={inputHandler}
          />
          <input
            type="text"
            name="options"
            value={product.options ?? ""}
            placeholder="옵션들(콤마(,)로 구분해주세요)"
            required
            onChange={inputHandler}
          />
          <Button
            text={isUploading ? "업로드중입니다..." : "제품 등록하기"}
            disabled={isUploading}
            onClick={buttonHandler}
          />
        </div>
      </div>
    </section>
  );
}

export default ProductAdd;
