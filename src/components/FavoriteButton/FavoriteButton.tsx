import React, { useState, useEffect } from 'react';
import { useAddProductFeaturedMutation, useDeleteProductFeaturedMutation } from '@/hook/productHook';
import useLocalFavorites from '@/hook/localStorageFavoriteHook';
import { getAccessToken } from '@/services/auth-token.service';
import { IProductResponse } from '@/interface/product';

interface Props {
  productId: number;
  productFeaturedData: IProductResponse;
}

const FavoriteButton = ({ productId, productFeaturedData }: Props) => {
  const { mutate: addProductFeaturedMutation } = useAddProductFeaturedMutation();
  const { mutate: deleteProductFeaturedMutation } = useDeleteProductFeaturedMutation();
  const { getLocalFavorites, addLocalFavorite, removeLocalFavorite } = useLocalFavorites();
  const accessToken = getAccessToken();

  const [isLocalFavorite, setIsLocalFavorite] = useState(false);

  useEffect(() => {
    const localFavorites = getLocalFavorites();
    setIsLocalFavorite(localFavorites.includes(productId));
  }, [productId, getLocalFavorites]);

  const isFeatured = productFeaturedData?.detail.some(
    (productFeature) => productFeature.product_id === productId
  );

  const handleAddFavorite = () => {
    if (accessToken) {
      addProductFeaturedMutation(productId);
    } else {
      addLocalFavorite(productId);
      setIsLocalFavorite(true); // Обновляем состояние
    }
  };

  const handleRemoveFavorite = () => {
    if (accessToken) {
      deleteProductFeaturedMutation(productId);
    } else {
      removeLocalFavorite(productId);
      setIsLocalFavorite(false); // Обновляем состояние
    }
  };

  return (
    <button
      style={{
        border: "0",
        backgroundColor: "transparent",
        color: isFeatured || isLocalFavorite ? "red" : "inherit",
      }}
      onClick={isFeatured || isLocalFavorite ? handleRemoveFavorite : handleAddFavorite}
    >
      <i className="bi bi-heart-fill"></i>
    </button>
  );
};

export default FavoriteButton;