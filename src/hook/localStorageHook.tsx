function useLocalFavorites() {
  const getLocalFavorites = (): number[] => {
    if (typeof window !== "undefined") {
      const storedFavorites = localStorage.getItem("favorites");
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    }
    return [];
  };

  const addLocalFavorite = (productId: number) => {
    const currentFavorites = getLocalFavorites();
    if (!currentFavorites.includes(productId)) {
      const updatedFavorites = [...currentFavorites, productId];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const removeLocalFavorite = (productId: number) => {
    const currentFavorites = getLocalFavorites();
    const updatedFavorites = currentFavorites.filter((id) => id !== productId);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return { getLocalFavorites, addLocalFavorite, removeLocalFavorite };
}

export default useLocalFavorites;
