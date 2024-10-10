import { ICategoryResponse } from "@/interface/category";
import { IProductResponseDetail } from "@/interface/product";

interface Props {
  categoryData: ICategoryResponse;
  filteredProducts: IProductResponseDetail[];
  categoryId: number;
  setCategoryId: (categoryId: number | undefined) => void;
}

export default function CategorySection({
  categoryData,
  filteredProducts,
  categoryId,
  setCategoryId,
}: Props) {
  return (
    <section className="shop-widget">
      <h2
        style={{
          background: "linear-gradient(297deg, #9CD0FF, #A95BF3, #9CD0FF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Категории
      </h2>
      <ul className="list-unstyled category-list">
        {categoryData?.detail
          .filter((category) =>
            filteredProducts.some(
              (product) =>
                product?.product_category?.category_id === category?.category_id
            )
          )
          .map((category) => (
            <li key={category.category_id}>
              <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (category.category_id === categoryId) {
                    setCategoryId(undefined);
                  } else {
                    setCategoryId(category.category_id);
                  }
                }}
              >
                <span className="name">{category.category_name}</span>
                <span className="num">{category.product_count}</span>
              </a>
            </li>
          ))}
      </ul>
    </section>
  );
}
