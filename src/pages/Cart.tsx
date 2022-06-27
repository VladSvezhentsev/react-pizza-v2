import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartEmpty, CartItem } from "../components";
import { clearPizzas } from "../redux/slices/cartSlice";
import { RootState } from "../redux/store";

function Cart() {
   const dispatch = useDispatch();
   const { items, totalPrice } = useSelector((state: RootState) => state.cart);
   const totalCount = items.reduce((sum, item) => sum + item.count, 0);

   const onClickClear = () => dispatch(clearPizzas());

   const onClickPay = () => alert("Thank you for your order!");

   if (!totalPrice) {
      return <CartEmpty />;
   }

   return (
      <div className="container container--cart">
         <div className="cart">
            <div className="cart__top">
               <h2 className="content__title">
                  <img src="../../img/cart.svg" alt="cart" /> Your order
               </h2>
               <div onClick={onClickClear} className="cart__clear">
                  <img src=" ../../img/trash.svg" alt="trash" />
                  <span>Empty trash</span>
               </div>
            </div>
            <div className="cart__items">
               {items.map((item) => (
                  <CartItem key={item.id} {...item} />
               ))}
            </div>
            <div className="cart__bottom">
               <div className="cart__bottom-details">
                  <span>
                     Total pizzas: <b>{totalCount}</b>
                  </span>
                  <span>
                     Order price: <b>{totalPrice} $</b>
                  </span>
               </div>
               <div className="cart__bottom-buttons">
                  <Link
                     to="/"
                     className="button button--outline button--add go-back-btn"
                  >
                     <img src="../../img/grey-arrow-left.svg" alt="arrleft" />
                     <span>Come back</span>
                  </Link>
                  <div onClick={onClickPay} className="button pay-btn">
                     <span>Pay now</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Cart;
