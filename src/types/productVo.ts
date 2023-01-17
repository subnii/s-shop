export interface ICartItemProps {
  product: ICartProduct;
}

export interface IProduct {
  category: string;
  description: string;
  id: string;
  image: string;
  options: Array<string>;
  price: number;
  title: string;
}

export interface ICartProduct {
  id: string;
  image: string;
  title: string;
  option: string;
  quantity: number;
  price: number;
}

export interface IProductWithUrl {
  product: IProduct;
  url: string;
}
