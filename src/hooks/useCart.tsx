import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrUpdateToCart, getCart, removeFromCart } from "../apis/firebase";
import { useAuthContext } from "../context/AuthContext";
import { ICartProduct } from "../types/productVo";

export default function useCart() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const cartQuery = useQuery<Array<ICartProduct>>(
    ["carts", uid || ""],
    () => getCart(uid),
    {
      enabled: !!uid,
    }
  );

  const addOrUpdateItem = useMutation(
    (product: ICartProduct) => addOrUpdateToCart(uid, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["carts", uid]);
      },
    }
  );

  const removeItem = useMutation((id: string) => removeFromCart(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", uid]);
    },
  });

  return { cartQuery, addOrUpdateItem, removeItem };
}
