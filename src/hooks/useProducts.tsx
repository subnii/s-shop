import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts as fetchProducts, addNewProduct } from "../apis/firebase";
import { IProduct, IProductWithUrl } from "../types/productVo";

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery<Array<IProduct>, string>(
    ["products"],
    fetchProducts,
    {
      staleTime: 1000 * 60,
    }
  );

  const addProduct = useMutation(
    ({ product, url }: IProductWithUrl) => addNewProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(["products"]),
    }
  );

  return { productsQuery, addProduct };
}
