"use client"

import { useCreateCartMutation } from "@/hook/cartHook";
import { useCategoryData } from "@/hook/categoryHook";
import useLocalFavorites from "@/hook/localStorageFavoriteHook";
import {
  useProductData,
  useProductFeaturedData,
} from "@/hook/productHook";
import { getAccessToken } from "@/services/auth-token.service";
import {  useState, useMemo, useCallback, useEffect } from "react";
import FilterSection from "./FilterSection";
import CategorySection from "./CategorySection";
import ProductList from "./ProductList";
import { ICategoryResponse } from "@/interface/category";
import useLocalCart from "@/hook/localStorageCartHook";

export default function ProductFeature() {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(6);
  const [nameProduct, setNameProduct] = useState<string | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [categoryId, setCategoryId] = useState<number>();

  const { categoryData } = useCategoryData();
  const { productFeaturedData, isLoading } = useProductFeaturedData();
  const { productData } = useProductData();
  const { mutate: createCartMutation } = useCreateCartMutation();
  const { getLocalFavorites } = useLocalFavorites();
  const [localFavorites, setLocalFavorites] = useState(() => getLocalFavorites() || []);

  const accessToken = getAccessToken();
  const {addLocalCart} = useLocalCart()

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedFavorite = getLocalFavorites();
      setLocalFavorites(updatedFavorite || []);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addCart = (product_id:number,product_price:number,product_quantity:number = 1,product_image:string) => {
    accessToken ? createCartMutation({product_id,product_price,product_quantity,product_image}) : addLocalCart({product_id,product_price,product_quantity})
  }

  const filteredProducts = useMemo(() => {
    let products = accessToken ? productFeaturedData?.detail : productData?.detail.filter(product => localFavorites.includes(product.product_id as number));

    if (nameProduct) {
      products = products?.filter(product => product.product_name.toLowerCase().includes(nameProduct.toLowerCase()));
    }

    if (minPrice !== undefined) {
      products = products?.filter(product => product.product_price >= minPrice);
    }

    if (maxPrice !== undefined) {
      products = products?.filter(product => product.product_price <= maxPrice);
    }

    if (categoryId) {
      products = products?.filter(product => product.product_category.category_id === categoryId);
    }

    return products || [];
  }, [productFeaturedData, productData, localFavorites, nameProduct, minPrice, maxPrice, categoryId, accessToken]);

  const resetFilters = useCallback(() => {
    setNameProduct(undefined);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setCategoryId(undefined);
  }, []);

  const handlePagination = useCallback((newSkip: number) => {
    setSkip(newSkip);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="row">
        <aside id="sidebar" className="col-xs-12 col-sm-4 col-md-3 wow fadeInLeft" data-wow-delay="0.4s">
          <FilterSection
            nameProduct={nameProduct as string}
            setNameProduct={setNameProduct}
            minPrice={minPrice as number}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice as number}
            setMaxPrice={setMaxPrice}
            resetFilters={resetFilters}
          />
          <CategorySection
            categoryData={categoryData as ICategoryResponse}
            filteredProducts={filteredProducts}
            categoryId={categoryId as number}
            setCategoryId={setCategoryId}
          />
        </aside>
        <ProductList
          filteredProducts={filteredProducts}
          skip={skip}
          limit={limit}
          addCart={addCart}
          handlePagination={handlePagination}
          productFeaturedData={productFeaturedData}
        />
      </div>
    </div>
  );
}
