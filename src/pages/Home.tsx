import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Categories, PizzaBlock, Skeleton, Sort } from "../components";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { RootState, useAppDispatch } from "../redux/store";

function Home() {
   const dispatch = useAppDispatch();
   const { items, status } = useSelector((state: RootState) => state.pizza);
   const { categoryId, sort, searchValue } = useSelector(
      (state: RootState) => state.filter
   );

   const pizzas = items
      .filter((item) =>
         item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

   const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

   const getPizzas = async () => {
      const sortBy = sort.sortProperty;
      const category = categoryId > 0 ? `category=${categoryId}` : "";

      dispatch(fetchPizzas({ category, sortBy }));
   };

   useEffect(() => {
      getPizzas();
      window.scrollTo(0, 0);
   }, [categoryId, sort.sortProperty, searchValue]);

   return (
      <div className="container">
         <div className="content__top">
            <Categories />
            <Sort />
         </div>
         <h2 className="content__title">All pizzas</h2>
         {status === "error" ? (
            <div className="content__error-info">
               <h2>An error has occurred 😕</h2>
               <p>
                  Unfortunately, it was not possible to get pizzas. Try again
                  later.
               </p>
            </div>
         ) : (
            <div className="content__items">
               {status === "loading" ? skeleton : pizzas}
            </div>
         )}
      </div>
   );
}

export default Home;
