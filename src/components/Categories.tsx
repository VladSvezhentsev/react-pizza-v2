import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";
import { RootState } from "../redux/store";

const categories = ["All", "Meaty", "Vegeterian", "Grill", "Spicy", "Closed"];

function Categories() {
   const dispatch = useDispatch();
   const categoryId = useSelector(
      (state: RootState) => state.filter.categoryId
   );

   const onClickCategory = (id: number) => dispatch(setCategoryId(id));

   return (
      <div className="categories">
         <ul>
            {categories.map((categoryName, i) => (
               <li
                  key={i}
                  onClick={() => onClickCategory(i)}
                  className={categoryId === i ? "active" : ""}
               >
                  {categoryName}
               </li>
            ))}
         </ul>
      </div>
   );
}

export default Categories;
