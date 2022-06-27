import { CartItem } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: CartItem[]) =>
   items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
